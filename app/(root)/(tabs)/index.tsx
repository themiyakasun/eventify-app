import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { logout } from '@/lib/appwrite';

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
      <Link href='/sign-up'>Sign up</Link>
      <Link href='/calendar'>Calendar</Link>
      <Link href='/events/1'>Event</Link>
      <Link href='/events/1/events-details/1'>Event Details</Link>
      <Link href='/on-boarding'>On Boarding</Link>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
