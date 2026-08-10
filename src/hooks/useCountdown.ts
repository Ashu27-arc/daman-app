import { useEffect, useState } from "react";
import {
  getCountdownParts,
  type CountdownParts,
  isExpired,
} from "@/utils/dateUtils";

interface UseCountdownOptions {
  expiryTime: string;
  serverTimeOffset: number;
  onExpire?: () => void;
}

export function useCountdown({
  expiryTime,
  serverTimeOffset,
  onExpire,
}: UseCountdownOptions) {
  const [parts, setParts] = useState<CountdownParts>(() =>
    getCountdownParts(expiryTime, serverTimeOffset)
  );

  useEffect(() => {
    const tick = () => {
      const next = getCountdownParts(expiryTime, serverTimeOffset);
      setParts(next);

      if (next.totalMs <= 0) {
        onExpire?.();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiryTime, serverTimeOffset, onExpire]);

  const expired = isExpired(expiryTime, serverTimeOffset);

  return { parts, expired };
}
