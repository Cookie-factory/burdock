import React, {useEffect, useState} from 'react';
import {useGetBoard, usePatchBoard, usePostBoard} from '~/apis/board/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Image from '~/components/common/image/Image';
import Input from '~/components/common/input/Input';
import Text from '~/components/common/text/Text';
import Center from '~/components/common/view/Center';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useImagePickerUpload from '~/hooks/navigator/useImagePickerUpload';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';
import {PostBoardData} from '~/types/api/board/data';
import {config} from '~/utils/config';
import IconCircleDelete24 from '~/assets/icons/IconCircleDelete24.svg';

function CommunityRegister() {
  const {goBack} = useNavigate();
  const param = useParam('CommunityRegister');

  const {data: beforeBoardData} = useGetBoard({id: param?.id});
  const [isSubmitFormLoading, setSubmitFormLoading] = useState(false);
  const {onImageUpload, onImagePicker, isImageLoad, imageDatas, setImageDatas} =
    useImagePickerUpload({isSubmitFormLoading, maxImageUploadCount: 5});

  const postBoard = usePostBoard();
  const patchBoard = usePatchBoard();

  const [form, setForm] = useState<Omit<PostBoardData, 'images'>>({
    title: '',
    content: '',
  });

  const onAddButtonClick = () => {
    if (isImageLoad) return;

    onImageUpload(onSubmit);
  };

  const onSubmit = () => {
    setSubmitFormLoading(true);

    if (param?.id) {
      // 수정하기
      patchBoard
        .mutateAsync({
          data: {
            ...form,
            images: imageDatas.map(item => item.cloudImageName),
          },
          id: param.id,
        })
        .then(patchResponse => {
          if (patchResponse.statusCode === 200) {
            setSubmitFormLoading(false);
            goBack();
          }
        });
    } else {
      // 등록하기
      postBoard
        .mutateAsync({
          ...form,
          images: imageDatas.map(item => item.cloudImageName),
        })
        .then(postResponse => {
          if (postResponse.statusCode === 201) {
            setSubmitFormLoading(false);
            //등록 성공
            goBack();
          }
        });
    }
  };

  const onDeleteImage = (index: number) => {
    setImageDatas(prev => {
      return prev.filter((_, _i) => _i !== index);
    });
  };

  useEffect(() => {
    if (beforeBoardData?.data && param?.id) {
      setForm({...beforeBoardData.data});
      setImageDatas(
        (beforeBoardData?.data.images ?? []).map(item => ({
          type: 'REGISTERED',
          cloudImageName: item,
        })),
      );
    }
  }, [beforeBoardData?.data]);

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Input
          label="제목"
          placeholder="제목"
          onChangeText={text => setForm(prev => ({...prev, title: text}))}
          value={form.title}
        />

        <CenterButton
          onPress={onImagePicker}
          borderWidth={1}
          w={120}
          h={40}
          my={14}>
          <Text>이미지 선택하기</Text>
        </CenterButton>

        <HStack borderWidth={1} h={80}>
          {imageDatas.map((item, i) => {
            return (
              <Center borderWidth={1} w={80} h={80} key={i}>
                <Image
                  borderWidth={1}
                  w={80}
                  h={80}
                  key={i}
                  source={{
                    uri:
                      item.localImageName ??
                      `${config.IMAGE_BASE_URL}${item.cloudImageName}`,
                  }}
                />

                <CenterButton
                  onPress={() => onDeleteImage(i)}
                  borderWidth={1}
                  position="absolute"
                  top={0}
                  right={0}
                  w={38}
                  h={38}>
                  <IconCircleDelete24 />
                </CenterButton>
              </Center>
            );
          })}
        </HStack>

        <Input
          mt={30}
          h={240}
          multiline
          label="내용"
          placeholder="내용"
          onChangeText={text => setForm(prev => ({...prev, content: text}))}
          value={form.content}
        />

        <CenterButton mt={30} onPress={onAddButtonClick}>
          <Text>추가</Text>
        </CenterButton>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default CommunityRegister;
