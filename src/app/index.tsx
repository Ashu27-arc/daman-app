import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { SplashScreen } from "@/components/SplashScreen";
import { WebViewScreen } from "@/screens/WebViewScreen";

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <SplashScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <WebViewScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D32F2F",
  },
});
