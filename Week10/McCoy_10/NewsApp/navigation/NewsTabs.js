import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import USNewsScreen from '../screens/USNewsScreen';
import WorldNewsScreen from '../screens/WorldNewsScreen';
import TechNewsScreen from '../screens/TechNewsScreen';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();

function NewsTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: Colors.primary700 },
        tabBarActiveTintColor: Colors.accent500,
        tabBarInactiveTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'Montserrat_700Bold',
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat_600SemiBold',
        },
      }}
    >
      <Tab.Screen
        name="USNews"
        component={USNewsScreen}
        options={{
          title: 'US News',
          tabBarLabel: 'US',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WorldNews"
        component={WorldNewsScreen}
        options={{
          title: 'World News',
          tabBarLabel: 'World',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TechNews"
        component={TechNewsScreen}
        options={{
          title: 'Tech News',
          tabBarLabel: 'Tech',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="laptop-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default NewsTabs;