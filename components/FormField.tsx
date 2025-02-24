import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';

type Props = {
  type: string;
  placeHolder: string;
  value?: string;
  handleChangeText?: (value: string) => void;
};

const FormField = ({ type, placeHolder, value, handleChangeText }: Props) => {
  const [pwVisibilty, setPwVisibilty] = useState(false);

  let icon;
  switch (type) {
    case 'email':
      icon = icons.email;
      break;
    case 'password':
      icon = icons.password;
      break;
    case 'text':
      icon = icons.user;
      break;
    default:
      icon = icons.email;
  }

  const changePwVisibilty = () => {
    setPwVisibilty(!pwVisibilty);
  };
  return (
    <View className='flex-row items-center px-2 py-2 mb-5 border-2 rounded-2xl border-secondary-grey'>
      <Image
        source={icon}
        className='items-center w-6 h-6 mr-3'
        resizeMode='stretch'
      />
      <TextInput
        className='font-inter'
        style={{ flex: 1 }}
        placeholder={placeHolder}
        underlineColorAndroid='transparent'
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={type === 'password' && !pwVisibilty}
      />
      {type === 'password' && (
        <TouchableOpacity onPress={changePwVisibilty}>
          <Image
            source={!pwVisibilty ? icons.eye : icons.hidden}
            className='items-center w-6 h-6 mr-3'
            resizeMode='stretch'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
