import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useAppExpiry } from "@/hooks/useAppExpiry";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorScreen";
import { OfflineScreen } from "@/components/OfflineScreen";
import { ExpiredModal } from "@/components/ExpiredModal";
import { ExpiredScreen } from "@/screens/ExpiredScreen";
import { WebViewScreen } from "@/screens/WebViewScreen";
import { DEFAULT_CONTACT_NUMBER } from "@/constants/config";

export default function App() {
  const {
    flowState,
    cachedAccess,
    errorMessage,
    isInitialLoad,
    isOffline,
    refreshStatus,
    markExpired,
  } = useAppExpiry();

  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const hasShownExpiredModal = useRef(false);

  useEffect(() => {
    if (flowState === "expired" && !hasShownExpiredModal.current) {
      hasShownExpiredModal.current = true;
      setShowExpiredModal(true);
    }
  }, [flowState]);

  const expiryTime = cachedAccess?.status.expiryTime ?? new Date().toISOString();
  const contactNumber =
    cachedAccess?.status.contactNumber ?? DEFAULT_CONTACT_NUMBER;
  const serverTimeOffset = cachedAccess?.serverTimeOffset ?? 0;

  if (isInitialLoad || flowState === "loading") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <LoadingScreen message="Verifying application access..." />
      </SafeAreaView>
    );
  }

  if (flowState === "offline") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <OfflineScreen onRetry={refreshStatus} />
      </SafeAreaView>
    );
  }

  if (flowState === "error") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ErrorScreen
          title="Unable to verify application"
          message={
            errorMessage ??
            "Please check your internet connection and try again."
          }
          onRetry={refreshStatus}
        />
      </SafeAreaView>
    );
  }

  if (flowState === "expired") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ExpiredScreen expiryTime={expiryTime} contactNumber={contactNumber} />
        <ExpiredModal
          visible={showExpiredModal}
          expiryTime={expiryTime}
          contactNumber={contactNumber}
          onClose={() => setShowExpiredModal(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <WebViewScreen
        expiryTime={expiryTime}
        serverTimeOffset={serverTimeOffset}
        onExpire={markExpired}
        onFocus={refreshStatus}
        isOffline={isOffline}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
});
