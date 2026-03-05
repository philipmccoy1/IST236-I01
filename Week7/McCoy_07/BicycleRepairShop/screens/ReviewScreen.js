import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomTitle from '../components/CustomTitle';
import NavButton from '../components/NavButton';

export default function ReviewScreen({ navigation, order, resetOrder }) {

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={{ flex:1, padding:20 }}>

      <CustomTitle title="Order Review" />

      <Text>Service Time: ${order.serviceTime}</Text>

      {order.services.map(service => (
        <Text key={service.name}>
          {service.name}: ${service.price}
        </Text>
      ))}

      {order.membership && <Text>Rental Membership: $100</Text>}
      {order.newsletter && <Text>Newsletter Signup: Free</Text>}

      <Text>Subtotal: ${order.subtotal?.toFixed(2)}</Text>
      <Text>Tax (8%): ${order.tax?.toFixed(2)}</Text>
      <Text>Total: ${order.total?.toFixed(2)}</Text>

      <NavButton 
        title="Return Home" 
        onPress={() => {
          resetOrder();
          navigation.navigate("Home");
        }} 
      />

    </LinearGradient>
  );
}