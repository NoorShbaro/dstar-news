import NetworkGuard from "@/components/NetworkGuard";
import CustomSplashScreen from "@/components/SplashScreen";
import { NetworkContext, NetworkProvider } from "@/context/networkContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { router, SplashScreen, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { LogLevel, OneSignal } from 'react-native-onesignal';

const ONESIGNAL_APP_ID = '509fc6a8-a696-442a-9f81-a0fc36dde44d';

function RootLayoutInner() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isAppReady, setAppReady] = useState(false);
  const { isConnected } = useContext(NetworkContext);

  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize(ONESIGNAL_APP_ID);
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.

    OneSignal.Notifications.requestPermission(true);
    OneSignal.Notifications.addEventListener('opened', (event: any) => {
      const postId = event.notification.additionalData?.id;

      // Prevent auto-launch by ignoring launchURL
      // event.notification.launchURL = null;
      console.log("Notification opened, postId:", postId);

      if (postId) {
        router.push(`/single/${postId}`);
      } else {
        router.push('/(home)');
      }
    });
    // Clean up event listener
    return () => {
      OneSignal.Notifications.removeEventListener('opened');
    };
  }, []);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAppReady(true);
    };
    prepareApp();
  }, []);

  const handleSplashScreenFinish = () => {
    setSplashVisible(false);
  };

  useEffect(() => {
    if (isConnected === null) return;

    if (isConnected === false) {
      return;
    }
  }, [isConnected]);

  if (isSplashVisible || !isAppReady) {
    return <CustomSplashScreen onFinish={handleSplashScreenFinish} />;
  }

  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   {/* <Stack.Screen name="home/index" /> */}
    //   {/* <Stack.Screen name="settings/index" /> */}
    //   {/* <Stack.Screen name='single/[id]' options={{ presentation: 'modal' }} /> */}
    // </Stack>
    <Stack screenOptions={{ headerShown: false }} />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NetworkProvider>
        <NetworkGuard>
          <RootLayoutInner />
        </NetworkGuard>
      </NetworkProvider>
    </ThemeProvider>
  );
}