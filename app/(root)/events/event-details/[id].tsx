import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const EventDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>EventDetails {id}</Text>
    </View>
  );
};

export default EventDetails;
