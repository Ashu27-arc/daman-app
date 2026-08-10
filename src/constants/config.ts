export const WEBSITE_URL =
  "https://damanvipgames.com/#/register?invitationCode=546523888661";

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:3000";

export const DEFAULT_CONTACT_NUMBER = "+919999999999";

export const EXPIRY_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export const STORAGE_KEYS = {
  DEVICE_ID: "@daman/device_id",
  CACHED_ACCESS: "@daman/cached_access",
} as const;
