import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/constants/config";
import type { AppAccessStatus, CachedAppAccess } from "@/types/expiry";
import { fetchAppAccessStatus } from "./api";
import { isExpired } from "@/utils/dateUtils";

export function computeServerTimeOffset(serverTime: string): number {
  return new Date(serverTime).getTime() - Date.now();
}

export async function cacheAccessStatus(
  status: AppAccessStatus
): Promise<CachedAppAccess> {
  const cached: CachedAppAccess = {
    status,
    serverTimeOffset: computeServerTimeOffset(status.serverTime),
    verifiedAt: Date.now(),
  };

  await AsyncStorage.setItem(
    STORAGE_KEYS.CACHED_ACCESS,
    JSON.stringify(cached)
  );

  return cached;
}

export async function getCachedAccessStatus(): Promise<CachedAppAccess | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_ACCESS);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CachedAppAccess;
  } catch {
    return null;
  }
}

export async function verifyAppAccess(
  deviceId: string
): Promise<CachedAppAccess> {
  const status = await fetchAppAccessStatus(deviceId);
  return cacheAccessStatus(status);
}

export function isAccessActive(cached: CachedAppAccess): boolean {
  if (!cached.status.active) {
    return false;
  }
  return !isExpired(cached.status.expiryTime, cached.serverTimeOffset);
}
