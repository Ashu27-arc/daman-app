import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/useCountdown";
import {
  formatCountdownLong,
  formatExpiryDate,
} from "@/utils/dateUtils";

interface CountdownTimerProps {
  expiryTime: string;
  serverTimeOffset: number;
  onExpire?: () => void;
}

export function CountdownTimer({
  expiryTime,
  serverTimeOffset,
  onExpire,
}: CountdownTimerProps) {
  const { parts } = useCountdown({ expiryTime, serverTimeOffset, onExpire });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Time Remaining:</Text>
      <Text style={styles.countdown}>{formatCountdownLong(parts)}</Text>
      <Text style={styles.expiresLabel}>Expires:</Text>
      <Text style={styles.expiresDate}>{formatExpiryDate(expiryTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
  },
  countdown: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  expiresLabel: {
    fontSize: 11,
    color: "#64748B",
  },
  expiresDate: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
});
