import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useGlobalContext } from '@/lib/global-provider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Slot } from 'expo-router';

const AppLayout = () => {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className='flex items-center justify-center h-full bg-white'>
        <ActivityIndicator className='text-primary-500' />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href='/sign-in' />;

  return <Slot />;
};

export default AppLayout;
