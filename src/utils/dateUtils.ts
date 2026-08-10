const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export function formatExpiryDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }
  return date.toLocaleString("en-IN", DATE_FORMAT);
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export function getCountdownParts(
  expiryTime: string,
  serverTimeOffset: number
): CountdownParts {
  const expiryMs = new Date(expiryTime).getTime();
  const nowMs = Date.now() + serverTimeOffset;
  const totalMs = Math.max(0, expiryMs - nowMs);

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalMs };
}

export function formatCountdownLong(parts: CountdownParts): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(parts.days)} Days : ${pad(parts.hours)} Hours : ${pad(parts.minutes)} Minutes : ${pad(parts.seconds)} Seconds`;
}

export function formatCountdownShort(parts: CountdownParts): string {
  return `${parts.days}d ${parts.hours}h ${parts.minutes}m ${parts.seconds}s`;
}

export function isExpired(
  expiryTime: string,
  serverTimeOffset: number
): boolean {
  const expiryMs = new Date(expiryTime).getTime();
  const nowMs = Date.now() + serverTimeOffset;
  return nowMs >= expiryMs;
}
