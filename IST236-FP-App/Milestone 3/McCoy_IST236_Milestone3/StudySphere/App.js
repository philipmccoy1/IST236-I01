import React, { useCallback, useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import AppDataProvider, { AppDataContext } from './context/AppDataContext';
import SplashScreenPage from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import FocusTimerScreen from './screens/FocusTimerScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import SettingsScreen from './screens/SettingsScreen';

// Create the stack and tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Keep the splash screen visible until everything loads
SplashScreen.preventAutoHideAsync().catch(() => {});

// Bottom tab navigation for the main app screens
function MainTabs() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { themeColors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: isLargeScreen ? 70 : 62,
          paddingTop: 6,
          paddingBottom: isLargeScreen ? 10 : 6,
          backgroundColor: themeColors.card,
          borderTopColor: themeColors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'poppins-bold',
          fontSize: isLargeScreen ? 13 : 11,
        },

        // Choose the tab icon for each screen
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';

          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Tasks') iconName = 'checkbox';
          if (route.name === 'Timer') iconName = 'timer';
          if (route.name === 'Resources') iconName = 'book';
          if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Timer" component={FocusTimerScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Main app content after providers are loaded
function AppContent() {
  const { darkMode, themeColors, isThemeReady } = useContext(ThemeContext);
  const { isDataReady } = useContext(AppDataContext);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  // Hide the splash screen after fonts and data finish loading
  const onReady = useCallback(async () => {
    if (fontsLoaded && isThemeReady && isDataReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isThemeReady, isDataReady]);

  // Do not show the app until everything is ready
  if (!fontsLoaded || !isThemeReady || !isDataReady) {
    return null;
  }

  // Choose the base navigation theme
  const baseTheme = darkMode ? DarkTheme : DefaultTheme;

  // Customize the navigation theme colors
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: themeColors.primary,
      background: themeColors.background,
      card: themeColors.card,
      text: themeColors.text,
      border: themeColors.border,
      notification: themeColors.secondary,
    },
  };

  return (
    <>
      {/* Set the phone status bar style */}
      <StatusBar style={darkMode ? 'light' : 'dark'} />

      {/* Navigation container for the full app */}
      <NavigationContainer theme={navigationTheme} onReady={onReady}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Splash screen shows first */}
          <Stack.Screen name="Splash" component={SplashScreenPage} />

          {/* Main tab screens load after splash */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// Wrap the app with providers
export default function App() {
  return (
    <SafeAreaProvider>
      {/* Theme settings for the full app */}
      <ThemeProvider>
        {/* App data like tasks, resources, and timer info */}
        <AppDataProvider>
          <AppContent />
        </AppDataProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}