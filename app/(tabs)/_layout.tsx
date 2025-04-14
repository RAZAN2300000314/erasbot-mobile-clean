import { Stack } from 'expo-router';
import { FavoritesProvider } from './../context/FavoritesContext';
import { ThemeProvider } from '../context/ThemeContext'; 
 




export default function RootLayout() {
  return (
    <ThemeProvider> 
      <FavoritesProvider> 
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" />
          <Stack.Screen name="SignupScreen" />
          <Stack.Screen name="homeScreen" />
          <Stack.Screen name="APIsScreen" />
          <Stack.Screen name="BookedScreen" />
          <Stack.Screen name="FeedbackScreen" />
          <Stack.Screen name="ECTS" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="account" />
          <Stack.Screen name="FavoritesScreen" />
          <Stack.Screen name="UniversitiesScreen" />
          <Stack.Screen name="UniversityCoursesScreen" />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
