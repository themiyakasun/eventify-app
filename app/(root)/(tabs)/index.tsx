import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

type Props = {};

const Index = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#FFFF',
      }}
    >
      <Text className='text-xl font-bold'>Welcome to eventify</Text>
      <Link href='/sign-in'>Sign in</Link>
      <Link href='/calendar'>Calendar</Link>
      <Link href='/events/1'>Event</Link>
      <Link href='/events/1/events-details/1'>Event Details</Link>
      <Link href='/on-boarding'>On Boarding</Link>
    </View>
  );
};

export default Index;
