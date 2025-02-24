import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import './global.css';
import { GlobalProvider } from '@/lib/global-provider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter/Inter_18pt-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter/Inter_18pt-ExtraBold.ttf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter/Inter_18pt-ExtraLight.ttf'),
    'Inter-Light': require('../assets/fonts/Inter/Inter_18pt-Light.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter/Inter_18pt-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter/Inter_18pt-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
