import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from './context/ThemeContext';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';             // ✅ Moved to the top
import { FavoritesProvider } from './context/FavoritesContext';   // ✅ Depends on UserProvider
import { BookedCoursesProvider } from './context/BookedCoursesContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { lightTheme, darkTheme } from '@/theme/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <NavigationThemeProvider value={theme}>
        <UserProvider> {/* ✅ Outer provider: provides userId to others */}
          <FavoritesProvider>
            <BookedCoursesProvider>
              <I18nextProvider i18n={i18n}>
                <StatusBar style={isDarkMode ? 'light' : 'dark'} />
                <Slot />
              </I18nextProvider>
            </BookedCoursesProvider>
          </FavoritesProvider>
        </UserProvider>
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
