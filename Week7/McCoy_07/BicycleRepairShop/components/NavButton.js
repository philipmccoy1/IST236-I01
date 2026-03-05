import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function NavButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#000',
        padding: 15,
        marginTop: 20,
        borderRadius: 10
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}