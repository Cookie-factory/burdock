import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useGetBoard, usePatchBoard, usePostBoard} from '~/apis/board/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Center from '~/components/common/view/Center';
import HStack from '~/components/common/view/HStack';
import useImagePickerUpload from '~/hooks/navigator/useImagePickerUpload';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';
import {PostBoardData} from '~/types/api/board/data';
import {config} from '~/utils/config';

function CommunityRegister() {
  const {goBack} = useNavigate();
  const param = useParam('CommunityRegister');

  const {data: beforeBoardData} = useGetBoard({id: param?.id});
  const [isSubmitFormLoading, setSubmitFormLoading] = useState(false);
  const {onImageUpload, onImagePicker, isImageLoad, imageDatas, setImageDatas} =
    useImagePickerUpload({isSubmitFormLoading, maxImageUploadCount: 5});

  const postBoard = usePostBoard();
  const patchBoard = usePatchBoard();

  const [form, setForm] = useState<PostBoardData>({
    title: '',
    content: '',
    images: [],
  });

  const onAddButtonClick = () => {
    onImageUpload(onSubmit);
  };

  const onSubmit = () => {
    if (param?.id) {
      // 수정하기
      patchBoard
        .mutateAsync({
          data: form,
          id: param.id,
        })
        .then(patchResponse => {
          if (patchResponse.statusCode === 200) {
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
            //등록 성공
            goBack();
          }
        });
    }
  };

  useEffect(() => {
    if (beforeBoardData?.data && param?.id) {
      setForm({...beforeBoardData.data});
    }
  }, [beforeBoardData?.data]);

  return (
    <View style={{flex: 1}}>
      <TextInput
        mode="outlined"
        label="제목"
        placeholder="제목"
        right={<TextInput.Icon icon="eye" />}
        onChangeText={text => setForm(prev => ({...prev, title: text}))}
        value={form.title}
      />

      <CenterButton
        onPress={onImagePicker}
        style={{borderWidth: 1, width: 122, height: 38}}>
        <Text>이미지 선택하기</Text>
      </CenterButton>

      <HStack style={{borderWidth: 1, height: 80}}>
        {imageDatas.map((item, i) => {
          return (
            <Center style={{borderWidth: 1, width: 80, height: 80}}>
              <Image
                style={{borderWidth: 1, width: 80, height: 80}}
                key={i}
                source={{
                  uri:
                    item.localImageName ??
                    `${config.IMAGE_BASE_URL}${item.cloudImageName}`,
                }}
              />
            </Center>
          );
        })}
      </HStack>

      <TextInput
        style={{
          height: 240,
        }}
        multiline
        mode="outlined"
        label="내용"
        placeholder="내용"
        right={<TextInput.Icon icon="eye" />}
        onChangeText={text => setForm(prev => ({...prev, content: text}))}
        value={form.content}
      />
      <Button mode="contained" onPress={onAddButtonClick}>
        추가
      </Button>
    </View>
  );
}

export default CommunityRegister;
