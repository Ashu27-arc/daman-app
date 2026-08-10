import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface OfflineScreenProps {
  onRetry: () => void;
}

export function OfflineScreen({ onRetry }: OfflineScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline</Text>
      <Text style={styles.message}>
        No internet connection. Please connect to the internet to verify your
        application access.
      </Text>
      <Text style={styles.note}>
        If your access was recently verified and is still valid, the app will
        resume once you are back online.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 24,
  },
  note: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#208AEF",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
