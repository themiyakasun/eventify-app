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
  onPress?: () => void;
};

const SocialButton = ({ icon, onPress }: Props) => {
  return (
    <TouchableOpacity
      className='items-center justify-center w-24 h-16 border-2 border-secondary-grey2 rounded-xl'
      onPress={onPress}
    >
      <Image source={icon} />
    </TouchableOpacity>
  );
};

export default SocialButton;
