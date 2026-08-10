import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView, type WebViewNavigation } from "react-native-webview";
import * as Linking from "expo-linking";
import { StatusHeader } from "@/components/StatusHeader";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorScreen";
import { WEBSITE_URL } from "@/constants/config";

interface WebViewScreenProps {
  expiryTime: string;
  serverTimeOffset: number;
  onExpire: () => void;
  onFocus?: () => void;
  isOffline?: boolean;
}

const EXTERNAL_SCHEMES = ["tel:", "mailto:", "sms:", "whatsapp:", "upi:"];

function isExternalUrl(url: string): boolean {
  if (EXTERNAL_SCHEMES.some((scheme) => url.startsWith(scheme))) {
    return true;
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const allowedHost = "damanvipgames.com";
    return host !== allowedHost && !url.startsWith("about:blank");
  } catch {
    return false;
  }
}

export function WebViewScreen({
  expiryTime,
  serverTimeOffset,
  onExpire,
  onFocus,
  isOffline = false,
}: WebViewScreenProps) {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isWebLoading, setIsWebLoading] = useState(true);
  const [webError, setWebError] = useState(false);

  const handleRetry = useCallback(() => {
    setWebError(false);
    setIsWebLoading(true);
    webViewRef.current?.reload();
  }, []);

  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      setCanGoBack(navState.canGoBack);
    },
    []
  );

  const handleShouldStartLoad = useCallback((request: { url: string }) => {
    const { url } = request;

    if (isExternalUrl(url)) {
      Linking.openURL(url).catch(() => undefined);
      return false;
    }

    return true;
  }, []);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      }
    );

    return () => subscription.remove();
  }, [canGoBack]);

  useEffect(() => {
    onFocus?.();
  }, [onFocus]);

  if (webError) {
    return (
      <ErrorScreen
        title="Unable to load the application"
        message="Please check your internet connection."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <View style={styles.container}>
      {isOffline ? (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            Offline — using last verified access
          </Text>
        </View>
      ) : null}
      <StatusHeader
        expiryTime={expiryTime}
        serverTimeOffset={serverTimeOffset}
        onExpire={onExpire}
      />
      <View style={styles.webViewContainer}>
        {isWebLoading ? (
          <View style={styles.loadingOverlay}>
            <LoadingScreen message="Loading website..." />
          </View>
        ) : null}
        <WebView
          ref={webViewRef}
          source={{ uri: WEBSITE_URL }}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          startInLoadingState={false}
          allowsBackForwardNavigationGestures
          onNavigationStateChange={handleNavigationStateChange}
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          onLoadStart={() => {
            setIsWebLoading(true);
            setWebError(false);
          }}
          onLoadEnd={() => setIsWebLoading(false)}
          onError={() => {
            setIsWebLoading(false);
            setWebError(true);
          }}
          onHttpError={() => {
            setIsWebLoading(false);
            setWebError(true);
          }}
          style={styles.webView}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
  offlineBanner: {
    backgroundColor: "#FBBF24",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  offlineText: {
    color: "#78350F",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
