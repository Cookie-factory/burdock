import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useGetBoard, usePatchBoard, usePostBoard} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';
import {PostBoardData} from '~/types/api/board/data';

function CommunityRegister() {
  const {goBack} = useNavigate();
  const param = useParam('CommunityRegister');

  const {data: beforeBoardData} = useGetBoard({id: param?.id});

  const postBoard = usePostBoard();
  const patchBoard = usePatchBoard();

  const [form, setForm] = useState<PostBoardData>({
    title: '',
    content: '',
    images: [],
  });

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
      postBoard.mutateAsync(form).then(postResponse => {
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
      <Button mode="contained" onPress={onSubmit}>
        추가
      </Button>
    </View>
  );
}

export default CommunityRegister;
