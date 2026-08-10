export interface AppAccessStatus {
  active: boolean;
  activationTime: string;
  expiryTime: string;
  contactNumber: string;
  serverTime: string;
}

export interface CachedAppAccess {
  status: AppAccessStatus;
  serverTimeOffset: number;
  verifiedAt: number;
}

export type AppState =
  | "loading"
  | "active"
  | "expired"
  | "offline"
  | "error";
