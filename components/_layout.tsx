import NetworkGuard from '@/components/NetworkGuard'
import CustomSplashScreen from '@/components/SplashScreen'
import { NetworkContext, NetworkProvider } from '@/context/networkContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { useAuth, UserProvider } from '@/context/UserContext'
import { router, Stack } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const StackLayout = () => {
  const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const { isConnected } = useContext(NetworkContext);

  const handleSplashScreenFinish = () => {
    setSplashScreenVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSplashScreenFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading || isSplashScreenVisible || isConnected === null) return;

    if (isConnected === false) {
      return; // 🚫 Do not navigate if offline
    }

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)');
    }
  }, [isSplashScreenVisible, isAuthenticated, isLoading, isConnected]);

  if (isLoading || isSplashScreenVisible) {
    return <CustomSplashScreen onFinish={handleSplashScreenFinish} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NetworkProvider>
          <NetworkGuard>
            <StackLayout />
          </NetworkGuard>
        </NetworkProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

const styles = StyleSheet.create({})