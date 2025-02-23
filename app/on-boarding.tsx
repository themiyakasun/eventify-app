import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ImageSourcePropType,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '@/constants/images';
import { onBoardingData } from '@/constants/data';
import PrimaryButton from '@/components/PrimaryButton';

const windowWidth = Dimensions.get('window').width;

interface OnBoardingItem {
  id: number;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

const OnBoarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<FlatList<OnBoardingItem>>(null);

  const Footer = () => {
    return (
      <View className='h-5 my-20 flex-row justify-between items-center'>
        {!(currentSlide === onBoardingData.length - 1) ? (
          <>
            <TouchableOpacity onPress={skip}>
              <Text className='text-sm  text-secondary-white/60 font-inter-semiBold'>
                Skip
              </Text>
            </TouchableOpacity>
            <View className='flex-row'>
              {onBoardingData.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index
                      ? 'bg-secondary-white'
                      : 'bg-secondary-white/50'
                  }  mr-2`}
                />
              ))}
            </View>
            <TouchableOpacity>
              <Text
                className='text-sm  text-secondary-white font-inter-semiBold'
                onPress={goToNextSlide}
              >
                Next
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <PrimaryButton text='Get started' type='black' />
        )}
      </View>
    );
  };

  const Slide: React.FC<{ item: OnBoardingItem }> = ({ item }) => {
    return (
      <View className='items-center'>
        <View className='flex items-center mt-10'>
          <Image source={images.logo} />
        </View>
        <Image
          source={item.image}
          className='h-1/4  mb-20'
          style={{ width: windowWidth }}
          resizeMode='contain'
        />

        <View
          className={`h-full bg-primary-500 rounded-t-[40px] ${
            currentSlide === onBoardingData.length - 1 ? 'px-10' : 'px-20'
          } py-10`}
          style={{ width: windowWidth }}
        >
          <Text className='text-3xl text-center font-inter-bold text-secondary-white'>
            {item.title}
          </Text>
          <Text className='text-center text-sm font-inter-light text-secondary-grey/50 mt-10'>
            {item.subtitle}
          </Text>

          <Footer />
        </View>
      </View>
    );
  };

  const updateCurrentSlide = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentSlide(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlide + 1;
    const offset = nextSlideIndex * windowWidth;
    ref.current?.scrollToOffset({ offset });
    setCurrentSlide(nextSlideIndex);
  };

  const skip = () => {
    const lastIndex = goToNextSlide.length - 1;
    console.log(lastIndex);
    const offset = lastIndex * windowWidth;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlide(lastIndex);
  };

  return (
    <SafeAreaView className='bg-white h-full flex' style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlide}
        data={onBoardingData}
        contentContainerClassName='h-full'
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide key={item.id} item={item} />}
        horizontal
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
