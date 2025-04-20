import React, {useEffect, useState} from 'react';
import {useGetBoard, usePatchBoard, usePostBoard} from '~/apis/board/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Image from '~/components/common/image/Image';
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
import FormInput from '~/components/common/input/FormInput';
import FormLabel from '~/components/common/input/FormLabel';
import CharacterPageMoveButton from '~/components/common/button/CharacterButton';
import {colors} from '~/constants/style';
import IconPlus29 from '~/assets/icons/IconPlus29.svg';
import ActiveButton from '~/components/common/button/ActiveButton';
import ScrollView from '~/components/common/scrollView/ScrollView';
import {useAppSelector} from '~/hooks/redux';

/**
 *@description 커뮤니티 게시글 등록 페이지
 */
function CommunityRegister() {
  const {goBack} = useNavigate();
  const param = useParam('CommunityRegister');
  const selectedCharacters = useAppSelector(
    state => state.counter.selectedCharacters,
  );

  const {data: beforeBoardData} = useGetBoard({id: param?.id});
  const [isSubmitFormLoading, setSubmitFormLoading] = useState(false);
  const {onImageUpload, onImagePicker, isImageLoad, imageDatas, setImageDatas} =
    useImagePickerUpload({isSubmitFormLoading, maxImageUploadCount: 5});

  const postBoard = usePostBoard();
  const patchBoard = usePatchBoard();

  const [form, setForm] = useState<
    Omit<PostBoardData, 'images' | 'characterIds'>
  >({
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
          characterIds: selectedCharacters.map(item => item.id),
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
      <ScrollView>
        <VStack flex={1} px={20}>
          <FormLabel>제목</FormLabel>
          <FormInput
            placeholder="제목"
            onChangeText={text => setForm(prev => ({...prev, title: text}))}
            value={form.title}
          />

          <FormLabel pt={38}>캐릭터</FormLabel>
          <CharacterPageMoveButton
            placeHolder="무슨 캐릭터 내용인가요?"
            text={selectedCharacters}
          />

          <FormLabel pt={38}>사진</FormLabel>

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

            <CenterButton
              onPress={onImagePicker}
              borderWidth={1}
              w={80}
              h={80}
              borderColor={colors.gray[50]}>
              <IconPlus29 />
            </CenterButton>
          </HStack>

          <FormLabel pt={38}>내용</FormLabel>

          <FormInput
            p={16}
            h={240}
            multiline
            label="내용"
            placeholder="내용"
            onChangeText={text => setForm(prev => ({...prev, content: text}))}
            value={form.content}
          />

          <ActiveButton
            mt={26}
            onPress={onAddButtonClick}
            buttonType="blue"
            text="추가"
          />
        </VStack>
      </ScrollView>
    </WhiteSafeAreaView>
  );
}

export default CommunityRegister;
