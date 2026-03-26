import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';

import HomeScreen from './screens/HomeScreen';
import DestinationOverviewScreen from './screens/DestinationOverviewScreen';

import Colors from './constants/colors';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* Status bar styling */}
      <StatusBar style="light" />

      {/* Navigation container wraps entire app */}
      <NavigationContainer onReady={onLayoutRootView}>
        
        {/* Stack navigator for screen navigation */}
        <Stack.Navigator
          screenOptions={{
            // Header background color
            headerStyle: { backgroundColor: Colors.primary500 },

            // Header text color
            headerTintColor: 'white',

            // Custom font for header title
            headerTitleStyle: {
              fontFamily: 'montserrat-bold'
            },

            // Background color for screens
            contentStyle: { backgroundColor: Colors.light100 }
          }}
        >
          
          {/* Home screen (grid of countries) */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Vacation Countries' }}
          />

          {/* Destination overview screen (list of destinations for selected country) */}
          <Stack.Screen
            name="DestinationOverview"
            component={DestinationOverviewScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}