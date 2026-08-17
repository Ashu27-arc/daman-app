import axios from "axios";
import type { AppAccessStatus } from "@/types/appAccess";

const API_URL = "https://daman-backend.onrender.com";

export async function fetchAppAccessStatus(
  deviceId: string
): Promise<AppAccessStatus> {
  const url = `${API_URL}/api/app-access/status`;

  try {
    const response = await axios.get<AppAccessStatus>(url, {
      headers: {
        Accept: "application/json",
        "X-Device-Id": deviceId,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw new Error(`API error: ${error.message}`);
  }
}
