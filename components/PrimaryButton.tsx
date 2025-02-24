import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  text: string;
  type: 'black' | 'orange';
  handlePress?: () => void;
};

const PrimaryButton = ({ text, type, handlePress }: Props) => {
  return (
    <TouchableOpacity
      className={`${
        type === 'black' ? 'bg-black' : 'bg-primary-500'
      } w-full rounded-2xl flex-row items-center justify-center h-16`}
      onPress={handlePress}
    >
      <Text className='text-base uppercase text-secondary-white font-inter-bold'>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
