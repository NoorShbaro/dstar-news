import CustomSplashScreen from "@/components/SplashScreen";
import { ThemeProvider } from "@/context/ThemeContext";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";

function RootLayoutInner() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isAppReady, setAppReady] = useState(false);

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
      const timeout = setTimeout(() => {
        SplashScreen.hideAsync();
        router.replace("/home");
      }, 500);
      return () => clearTimeout(timeout);
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
      <Stack.Screen name='single/[id]' options={{ presentation: 'modal' }}/>
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