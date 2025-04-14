// app/_layout.tsx
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from './context/ThemeContext';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { BookedCoursesProvider } from './context/BookedCoursesContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // ✅ Ensure this path is correct

import { lightTheme, darkTheme } from '@/theme/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <NavigationThemeProvider value={theme}>
        <BookedCoursesProvider>
          <FavoritesProvider>
            <I18nextProvider i18n={i18n}>
              <StatusBar style={isDarkMode ? 'light' : 'dark'} />
              <Slot /> {/* ✅ Required for routing */}
            </I18nextProvider>
          </FavoritesProvider>
        </BookedCoursesProvider>
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
