import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import NewsTabs from './NewsTabs';
import BookmarkedNewsScreen from '../screens/BookmarkedNewsScreen';
import Colors from '../constants/colors';

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        drawerStyle: { backgroundColor: Colors.white },
        drawerActiveBackgroundColor: '#dbeafe',
        drawerActiveTintColor: Colors.primary700,
        drawerInactiveTintColor: Colors.gray700,
        headerTitleStyle: {
          fontFamily: 'Montserrat_700Bold',
        },
        drawerLabelStyle: {
          fontFamily: 'Montserrat_600SemiBold',
        },
      }}
    >
      <Drawer.Screen
        name="NewsTabs"
        component={NewsTabs}
        options={{
          title: 'All News',
          drawerLabel: 'News Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="BookmarkedNews"
        component={BookmarkedNewsScreen}
        options={{
          title: 'Bookmarked News',
          drawerLabel: 'Bookmarked News',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawer;