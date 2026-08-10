import { View, Text, StyleSheet } from "react-native";
import { CountdownTimer } from "./CountdownTimer";

interface StatusHeaderProps {
  expiryTime: string;
  serverTimeOffset: number;
  onExpire: () => void;
}

export function StatusHeader({
  expiryTime,
  serverTimeOffset,
  onExpire,
}: StatusHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.activeLabel}>Application Active</Text>
      <CountdownTimer
        expiryTime={expiryTime}
        serverTimeOffset={serverTimeOffset}
        onExpire={onExpire}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#059669",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
