import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ReviewScreen from './screens/ReviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [order, setOrder] = useState({
    serviceTime: 0,
    services: [],
    newsletter: false,
    membership: false,
    total: 0
  });

  const calculateTotal = (data) => {
    let subtotal = 0;

    subtotal += data.serviceTime;
    subtotal += data.services.reduce((sum, item) => sum + item.price, 0);
    if (data.membership) subtotal += 100;

    const tax = subtotal * 0.06;
    const total = subtotal + tax;

    setOrder({ ...data, subtotal, tax, total });
  };

  const resetOrder = () => {
    setOrder({
      serviceTime: 0,
      services: [],
      newsletter: false,
      membership: false,
      total: 0
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen 
              {...props} 
              calculateTotal={calculateTotal}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Review">
          {(props) => (
            <ReviewScreen 
              {...props}
              order={order}
              resetOrder={resetOrder}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}