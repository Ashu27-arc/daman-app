import { API_URL } from "@/constants/config";
import type { AppAccessStatus } from "@/types/expiry";

export async function fetchAppAccessStatus(
  deviceId: string
): Promise<AppAccessStatus> {
  const url = `${API_URL}/api/app-access/status`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Device-Id": deviceId,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API error ${response.status}: ${body}`);
  }

  return response.json() as Promise<AppAccessStatus>;
}
