import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Image
          source={require("../../assets/images/splash-hero.jpg")}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.tagline}>
        Withdraw fast, safe and stable
      </Text>

      <View style={styles.logoSection}>
        <View style={styles.logoRow}>
          <View style={styles.wingLeft}>
            <View style={[styles.wingBar, styles.wingBarLong]} />
            <View style={[styles.wingBar, styles.wingBarMid]} />
            <View style={[styles.wingBar, styles.wingBarShort]} />
          </View>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>D</Text>
          </View>
          <View style={styles.wingRight}>
            <View style={[styles.wingBar, styles.wingBarLong]} />
            <View style={[styles.wingBar, styles.wingBarMid]} />
            <View style={[styles.wingBar, styles.wingBarShort]} />
          </View>
        </View>
        <Text style={styles.brandName}>Daman</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heroContainer: {
    width: width * 0.85,
    aspectRatio: 1,
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  tagline: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 0.3,
  },
  logoSection: {
    alignItems: "center",
    position: "absolute",
    bottom: 60,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  logoLetter: {
    fontSize: 28,
    fontWeight: "900",
    color: "#C62828",
    fontStyle: "italic",
  },
  brandName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  wingLeft: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    transform: [{ scaleX: -1 }],
  },
  wingRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
  },
  wingBar: {
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  wingBarLong: { width: 36 },
  wingBarMid: { width: 28 },
  wingBarShort: { width: 18 },
});
