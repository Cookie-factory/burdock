import React from 'react';
import {useDeleteBoard, useGetBoard} from '~/apis/board/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
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
    <VStack flex={1} px={20} pt={20}>
      <HStack justifyContent="flex-end" mb={24}>
        <CenterButton mr={14} w={94} onPress={onMoveModifyPage}>
          <Text>수정</Text>
        </CenterButton>

        <CenterButton w={94} onPress={onDelete}>
          <Text>삭제</Text>
        </CenterButton>
      </HStack>

      <HStack borderWidth={1} h={48} mb={24}>
        <Text w={'100%'} borderWidth={1}>
          {data?.data.title ?? ''}
        </Text>
      </HStack>

      <VStack borderWidth={1} minH={120}>
        <Text w={'100%'} borderWidth={1}>
          {data?.data.content ?? ''}
        </Text>
      </VStack>
    </VStack>
  );
}

export default CommunityContent;
