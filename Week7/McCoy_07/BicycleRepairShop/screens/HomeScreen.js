import React, { useState } from 'react';
import { View, Text, ImageBackground, Switch } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import CustomTitle from '../components/CustomTitle';
import NavButton from '../components/NavButton';

const servicesList = [
  { name: "Basic Tune-Up", price: 50 },
  { name: "Comprehensive Tune-Up", price: 75 },
  { name: "Flat Tire Repair", price: 20 },
  { name: "Brake Servicing", price: 50 },
  { name: "Gear Servicing", price: 40 },
  { name: "Chain Servicing", price: 15 },
  { name: "Frame Repair", price: 35 },
  { name: "Safety Check", price: 25 },
  { name: "Accessory Install", price: 10 },
];

export default function HomeScreen({ navigation, calculateTotal }) {

  const [serviceTime, setServiceTime] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [newsletter, setNewsletter] = useState(false);
  const [membership, setMembership] = useState(false);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const submitOrder = () => {
    calculateTotal({
      serviceTime,
      services: selectedServices,
      newsletter,
      membership
    });
    navigation.navigate("Review");
  };

  return (
    <ImageBackground source={require('../assets/bike-bg.jpg')} style={{ flex:1, padding:20 }}>

      <CustomTitle title="Bike Repair Shop" />

      <Text>Service Time:</Text>
      <RadioButton.Group onValueChange={value => setServiceTime(parseInt(value))}>
        <RadioButton.Item label="Standard ($0)" value="0" />
        <RadioButton.Item label="Expedited ($50)" value="50" />
        <RadioButton.Item label="Next Day ($100)" value="100" />
      </RadioButton.Group>

      <Text>Services:</Text>
      {servicesList.map(service => (
        <Checkbox.Item
          key={service.name}
          label={`${service.name} ($${service.price})`}
          status={selectedServices.includes(service) ? 'checked' : 'unchecked'}
          onPress={() => toggleService(service)}
        />
      ))}

      <Text>Newsletter Signup</Text>
      <Switch value={newsletter} onValueChange={setNewsletter} />

      <Text>Rental Membership ($100)</Text>
      <Switch value={membership} onValueChange={setMembership} />

      <NavButton title="Submit Order" onPress={submitOrder} />

    </ImageBackground>
  );
}