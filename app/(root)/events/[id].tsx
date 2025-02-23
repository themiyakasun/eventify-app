import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const EventPreview = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ backgroundColor: '#FFFF' }}>
      <Text>EventPreview {id}</Text>
    </View>
  );
};

export default EventPreview;
