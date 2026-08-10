import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { EXPIRY_CHECK_INTERVAL_MS } from "@/constants/config";
import type { AppState as AppFlowState, CachedAppAccess } from "@/types/expiry";
import {
  getCachedAccessStatus,
  isAccessActive,
  verifyAppAccess,
} from "@/services/expiryService";
import { getDeviceId } from "@/utils/deviceId";
import { isExpired } from "@/utils/dateUtils";

interface UseAppExpiryResult {
  flowState: AppFlowState;
  cachedAccess: CachedAppAccess | null;
  errorMessage: string | null;
  isInitialLoad: boolean;
  isOffline: boolean;
  refreshStatus: () => Promise<void>;
  markExpired: () => void;
}

export function useAppExpiry(): UseAppExpiryResult {
  const [flowState, setFlowState] = useState<AppFlowState>("loading");
  const [cachedAccess, setCachedAccess] = useState<CachedAppAccess | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const deviceIdRef = useRef<string | null>(null);

  const applyActiveOrExpired = useCallback((cached: CachedAppAccess) => {
    setCachedAccess(cached);

    if (!cached.status.active || !isAccessActive(cached)) {
      setFlowState("expired");
      return;
    }

    setFlowState("active");
  }, []);

  const refreshStatus = useCallback(async () => {
    if (!deviceIdRef.current) {
      deviceIdRef.current = await getDeviceId();
    }

    const cached = await getCachedAccessStatus();

    if (!isConnected) {
      if (cached && isAccessActive(cached)) {
        applyActiveOrExpired(cached);
        setIsInitialLoad(false);
        return;
      }

      if (
        cached &&
        (!cached.status.active ||
          isExpired(cached.status.expiryTime, cached.serverTimeOffset))
      ) {
        setCachedAccess(cached);
        setFlowState("expired");
        setIsInitialLoad(false);
        return;
      }

      setFlowState("offline");
      setIsInitialLoad(false);
      return;
    }

    try {
      const verified = await verifyAppAccess(deviceIdRef.current);
      applyActiveOrExpired(verified);
      setErrorMessage(null);
    } catch (error) {
      if (cached) {
        applyActiveOrExpired(cached);

        if (flowState !== "expired" && !isAccessActive(cached)) {
          setFlowState("expired");
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Verification failed"
        );
      } else {
        setFlowState("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to verify access"
        );
      }
    } finally {
      setIsInitialLoad(false);
    }
  }, [applyActiveOrExpired, isConnected]);

  const markExpired = useCallback(() => {
    setFlowState("expired");
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = Boolean(
        state.isConnected && state.isInternetReachable !== false
      );
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected) {
      refreshStatus();
    }
  }, [isConnected, refreshStatus]);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        refreshStatus();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, [refreshStatus]);

  useEffect(() => {
    if (flowState !== "active" || !isConnected) {
      return;
    }

    const interval = setInterval(() => {
      refreshStatus();
    }, EXPIRY_CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [flowState, isConnected, refreshStatus]);

  useEffect(() => {
    if (!cachedAccess || flowState === "expired") {
      return;
    }

    if (
      isExpired(cachedAccess.status.expiryTime, cachedAccess.serverTimeOffset)
    ) {
      setFlowState("expired");
    }
  }, [cachedAccess, flowState]);

  return {
    flowState,
    cachedAccess,
    errorMessage,
    isInitialLoad,
    isOffline: !isConnected,
    refreshStatus,
    markExpired,
  };
}
