// Required for gesture handling
import 'react-native-gesture-handler';

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Expo UI and splash screen handling
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// React hooks
import { useEffect } from 'react';

// Font loading from Expo
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

// Custom components/screens
import MainDrawer from './navigation/MainDrawer';
import NewsDetailScreen from './screens/NewsDetailScreen';
import Colors from './constants/colors';

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {

  // Load custom fonts for the app
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  // While fonts are still loading, render nothing
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {/* Set status bar style */}
      <StatusBar style="light" />

      {/* Navigation container wraps the entire app */}
      <NavigationContainer>

        {/* Top-level Stack Navigator */}
        <Stack.Navigator
          screenOptions={{
            // Header styling
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',

            // Screen background styling
            contentStyle: { backgroundColor: Colors.gray100 },

            // Custom font for header titles
            headerTitleStyle: {
              fontFamily: 'Montserrat_700Bold',
            },
          }}
        >

          {/* Main Drawer*/}
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />

          {/* News Detail screen*/}
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetailScreen}
            options={{ title: 'News Details' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}