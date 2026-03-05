import React from 'react';
import { Text } from 'react-native';

export default function CustomTitle({ title }) {
  return (
    <Text style={{
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      textAlign: 'center',
      marginBottom: 20
    }}>
      {title}
    </Text>
  );
}