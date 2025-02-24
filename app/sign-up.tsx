import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import { Link, router } from 'expo-router';
import SocialButton from '@/components/SocialButton';
import icons from '@/constants/icons';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

const SignUp = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeText = (field: string) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    try {
      const result = await createUser(form.fullName, form.email, form.password);

      if (result) {
        refetch();
      }

      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView className='h-full px-4 bg-white'>
      <ScrollView contentContainerClassName='h-full'>
        <Text className='text-base text-secondary-softDarkish font-inter'>
          Create account and enjoy all services
        </Text>
        <View className='mt-10'>
          <FormField
            type='text'
            placeHolder='Type your full name'
            value={form.fullName}
            handleChangeText={handleChangeText('fullName')}
          />
          <FormField
            type='email'
            placeHolder='Type your email address'
            value={form.email}
            handleChangeText={handleChangeText('email')}
          />
          <FormField
            type='password'
            placeHolder='Type your password'
            value={form.password}
            handleChangeText={handleChangeText('password')}
          />
          <FormField
            type='password'
            placeHolder='Type your confirm password'
            value={form.confirmPassword}
            handleChangeText={handleChangeText('confirmPassword')}
          />

          <View className='mt-10'>
            <PrimaryButton
              text='Sign up'
              type='black'
              handlePress={handleSubmit}
            />
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
            <SocialButton icon={icons.google} />
            <SocialButton icon={icons.apple} />
          </View>

          <View className='flex-row items-center justify-center gap-2 mt-10'>
            <Text className='text-base text-black/50 font-inter-medium'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='text-base text-primary-500 font-inter-medium'
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
