import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Daman VIP Games",
  slug: "daman-vip-games",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "damanvipgames",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.damanvipgames.app",
    infoPlist: {
      NSCameraUsageDescription:
        "This app needs camera access for uploading photos on the website.",
      NSPhotoLibraryUsageDescription:
        "This app needs photo library access for uploading images on the website.",
    },
  },
  android: {
    package: "com.damanvipgames.app",
    adaptiveIcon: {
      backgroundColor: "#0F172A",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    permissions: [
      "INTERNET",
      "ACCESS_NETWORK_STATE",
      "CAMERA",
      "READ_MEDIA_IMAGES",
    ],
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#0F172A",
        image: "./assets/images/splash-icon.png",
        imageWidth: 96,
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "Allow Daman VIP Games to access your photos for website uploads.",
        cameraPermission:
          "Allow Daman VIP Games to use your camera for website uploads.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "your-eas-project-id",
    },
  },
});
