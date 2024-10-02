import React, {useState} from 'react';
import {Image, Pressable, ScrollView} from 'react-native';
import {RegisterImageData} from '~/types/util/image';
import {config} from '~/utils/config';
import HStack from '../view/HStack';
import VStack from '../view/VStack';

// const MAX_IMAGE_COUNT = 5;

interface Props {
  images: RegisterImageData[];
  setImages: React.Dispatch<React.SetStateAction<RegisterImageData[]>>;
  onImagePicker: () => void;
}

/**
 *@description 이미지 업로더 버튼
 */
function ImageUploader({images, setImages, onImagePicker}: Props) {
  //   const {isOpen, onOpen, onClose} = useDisclose();
  const [modalIndex, setModalIndex] = useState(0);
  //   const swiperRef = useRef<Swiper | null>(null);

  const onDeleteImage = (_index: number) => {
    setImages(prev => prev.filter((i, index) => index !== _index));
    // onClose();
  };

  const onModalOpen = (index: number) => {
    // setModalIndex(index);
    // onOpen();
  };

  // 스와이퍼 확장 모달창 index 변경 핸들러
  //   const onChangeIndexInModal = (value: number) => {
  //     setModalIndex(prev => {
  //       if (prev === 0 && value === -1) {
  //         if (swiperRef.current) swiperRef.current?.goTo(prev);
  //         return prev;
  //       }
  //       if (prev === images.length - 1 && value === 1) {
  //         if (swiperRef.current) swiperRef.current?.goTo(prev);
  //         return prev;
  //       }

  //       return prev + value;
  //     });
  //   };

  return (
    <ScrollView
      bounces={false}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <HStack>
        {images &&
          images.map((item, index) => (
            <VStack key={index.toString()}>
              <Pressable onPress={() => onModalOpen(index)}>
                <Image
                  style={{width: 96, height: 96}}
                  source={{
                    uri: `${
                      item.type === 'REGISTERED' ? config.IMAGE_BASE_URL : ''
                    }${item.localImageName}`,
                  }}
                  alt={'image'}
                />
              </Pressable>
            </VStack>
          ))}

        {/* {images.length < MAX_IMAGE_COUNT && (
          <Button variant="unstyled" w="96px" h="96px" onPress={onImagePicker}>
            <ImageAddImage />
          </Button>
        )} */}
      </HStack>
    </ScrollView>
  );
}

export default ImageUploader;
