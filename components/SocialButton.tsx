import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

type Props = {
  icon: ImageSourcePropType;
};

const SocialButton = ({ icon }: Props) => {
  return (
    <TouchableOpacity className='items-center justify-center w-24 h-16 border-2 border-secondary-grey2 rounded-xl'>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

export default SocialButton;
