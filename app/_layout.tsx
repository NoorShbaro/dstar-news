import CustomSplashScreen from "@/components/SplashScreen";
import { ThemeProvider } from "@/context/ThemeContext";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { LogLevel, OneSignal } from 'react-native-onesignal';

const ONESIGNAL_APP_ID = '509fc6a8-a696-442a-9f81-a0fc36dde44d';

function RootLayoutInner() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize(ONESIGNAL_APP_ID);
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.

    // OneSignal.Notifications.requestPermission(false);
    OneSignal.Notifications.addEventListener('opened', (event: any) => {
      const postId = event.notification.additionalData?.id;

      // Prevent auto-launch by ignoring launchURL
      event.notification.launchURL = null;

      if (postId) {
        router.push(`/single/${postId}`);
      } else {
        router.push('/home');
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

  useEffect(() => {
    if (!isSplashVisible && isAppReady) {
      SplashScreen.hideAsync().then(() => {
        router.replace("/home");
      });
    }
  }, [isSplashVisible, isAppReady]);

  const handleSplashScreenFinish = () => {
    setSplashVisible(false);
  };

  if (isSplashVisible || !isAppReady) {
    return <CustomSplashScreen onFinish={handleSplashScreenFinish} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home/index" />
      {/* <Stack.Screen name="settings/index" /> */}
      <Stack.Screen name='single/[id]' options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutInner />
    </ThemeProvider>
  );
}