import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({
  message = "Please wait",
}: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Loading...</Text>
      <ActivityIndicator size="large" color="#208AEF" style={styles.spinner} />
      <Text style={styles.subtitle}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
    padding: 24,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  spinner: {
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
  },
});
