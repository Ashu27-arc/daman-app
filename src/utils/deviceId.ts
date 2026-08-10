import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import { Platform } from "react-native";
import { STORAGE_KEYS } from "@/constants/config";

function generateUuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

async function getPlatformDeviceId(): Promise<string | null> {
  if (Platform.OS === "android") {
    return Application.getAndroidId();
  }
  if (Platform.OS === "ios") {
    return Application.getIosIdForVendorAsync();
  }
  return null;
}

export async function getDeviceId(): Promise<string> {
  const stored = await AsyncStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  if (stored) {
    return stored;
  }

  const platformId = await getPlatformDeviceId();
  const deviceId = platformId ?? generateUuid();

  await AsyncStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
  return deviceId;
}
