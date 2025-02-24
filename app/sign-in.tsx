import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router';

import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import SocialButton from '@/components/SocialButton';
import icons from '@/constants/icons';
import { googleLogin } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();
  const [isRemember, setIsRemember] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const toggleSwitch = () => setIsRemember(!isRemember);

  if (!loading && isLoggedIn) return <Redirect href='/' />;

  const handleGoogleLogin = async () => {
    const result = await googleLogin();

    if (result) {
      refetch();
    } else {
      Alert.alert('error', 'Failed to login');
    }
  };

  return (
    <SafeAreaView className='h-full px-4 bg-white'>
      <ScrollView contentContainerClassName='h-full'>
        <Text className='text-base text-secondary-softDarkish font-inter'>
          Give credentials to sign in your account
        </Text>
        <View className='mt-10'>
          <FormField type='email' placeHolder='Type your email address' />
          <FormField type='password' placeHolder='Type your password' />

          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap'>
              <Switch
                trackColor={{ false: '#F0F0EE', true: '#F76810' }}
                thumbColor={'#FFFF'}
                onValueChange={toggleSwitch}
                value={isRemember}
              />
              <Text className='text-base font-inter-medium text-secondary-softDarkish'>
                Remember Me
              </Text>
            </View>
            <Link
              href='/'
              className='text-base font-inter-medium text-primary-500'
            >
              Forget Password?
            </Link>
          </View>

          <View className='mt-10'>
            <PrimaryButton text='Sign in' type='black' />
          </View>

          <View className='flex-row items-center justify-center w-full gap-2 my-28'>
            <View className='w-full border-b-2 border-secondary-grey2'></View>
            <Text className='text-sm text-secondary-grey2 font-inter-medium'>
              or continue with
            </Text>
            <View className='w-full border-b-2 border-secondary-grey2'></View>
          </View>

          <View className='flex-row items-center justify-center gap-5'>
            <SocialButton icon={icons.facebook} />
            <SocialButton icon={icons.google} onPress={handleGoogleLogin} />
            <SocialButton icon={icons.apple} />
          </View>

          <View className='flex-row items-center justify-center gap-2 mt-10'>
            <Text className='text-base text-black/50 font-inter-medium'>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-base text-primary-500 font-inter-medium'
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
