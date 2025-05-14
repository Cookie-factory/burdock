import React, {useState} from 'react';
import VStack from '../view/VStack';
import HStack from '../view/HStack';
import {colors} from '~/constants/style';
import GallerySwiper from 'react-native-gallery-swiper';
import {config} from '~/utils/config';
import CustomText from '../text/Text';
import Center from '../view/Center';

interface Props {
  images: string[];
}

/**
 *@description 큰 이미지 스와이퍼
 */
function BigImageSwiper({images}: Props) {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const totalImageLength = images.length ?? 0;

  return (
    <VStack>
      <HStack h={320} bgColor={colors.gray[60]}>
        <GallerySwiper
          onPageSelected={state => {
            setSwiperIndex(state);
          }}
          images={images.map(item => ({
            uri: `${config.IMAGE_BASE_URL}${item}`,
          }))}
          resizeMode="cover"
        />

        <HStack
          w={52}
          h={28}
          position="absolute"
          zIndex={1}
          top={14}
          right={18}
          bgColor={colors.gray[90]}
          justifyContent="center"
          borderRadius={12}>
          <CustomText color={colors.gray[0]} fontWeight={'bold'}>
            {swiperIndex + 1} / {totalImageLength}
          </CustomText>
        </HStack>
      </HStack>

      <Center flexDirection="row" gap={10} marginBlock={12}>
        {Array.from({length: totalImageLength}).map((_, i) => (
          <HStack
            key={i}
            w={10}
            h={10}
            borderRadius={10}
            borderWidth={1}
            borderColor={colors.gray[60]}
            bgColor={colors.gray[swiperIndex === i ? 80 : 0]}
          />
        ))}
      </Center>
    </VStack>
  );
}

export default BigImageSwiper;
