import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useDeleteBoard, useGetBoard} from '~/apis/board/hook';
import HStack from '~/components/common/view/HStack';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';

function CommunityContent() {
  const {navigate, goBack} = useNavigate();

  const param = useParam('CommunityContent');

  const {data} = useGetBoard({id: param?.id});
  const deleteBoard = useDeleteBoard();

  const onDelete = () => {
    if (!data?.data.id) return;

    deleteBoard.mutateAsync({id: data?.data.id}).then(response => {
      if (response.statusCode === 200) {
        console.log('@ 삭제완료');
        goBack();
      }
    });
  };

  const onMoveModifyPage = () => {
    if (!data?.data.id) return;

    navigate('CommunityRegister', {
      id: data?.data.id,
    });
  };

  return (
    <View style={{flex: 1}}>
      <HStack>
        <Button mode="contained" onPress={onMoveModifyPage}>
          수정
        </Button>

        <Button mode="contained" onPress={onDelete}>
          삭제
        </Button>
      </HStack>
      <Text>{data?.data.title ?? ''}</Text>
      <Text>{data?.data.content ?? ''}</Text>
    </View>
  );
}

export default CommunityContent;
