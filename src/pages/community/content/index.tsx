import React from 'react';
import {useDeleteBoard, useGetBoard} from '~/apis/board/hook';
import CenterButton from '~/components/common/button/CenterButton';
import Image from '~/components/common/image/Image';
import Text from '~/components/common/text/Text';
import Center from '~/components/common/view/Center';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';
import {config} from '~/utils/config';

function CommunityContent() {
  const {navigate, goBack} = useNavigate();

  const param = useParam('CommunityContent');

  const {data, refetch} = useGetBoard({id: param?.id});
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

  useFocusScreen(() => {
    refetch();
  });

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20} pt={20}>
        <HStack justifyContent="flex-end" mb={24}>
          <CenterButton w={64} onPress={onMoveModifyPage}>
            <Text>수정</Text>
          </CenterButton>

          <CenterButton w={64} onPress={onDelete}>
            <Text>삭제</Text>
          </CenterButton>
        </HStack>

        <HStack borderWidth={1} h={48} mb={24}>
          <Text w={'100%'} borderWidth={1}>
            {data?.data.title ?? ''}
          </Text>
        </HStack>

        <HStack borderWidth={1} h={80} mb={16}>
          {(data?.data.images ?? []).map((item, i) => {
            return (
              <Center borderWidth={1} w={80} h={80} key={i}>
                <Image
                  borderWidth={1}
                  w={80}
                  h={80}
                  key={i}
                  source={{
                    uri: `${config.IMAGE_BASE_URL}${item}`,
                  }}
                />
              </Center>
            );
          })}
        </HStack>

        <VStack minH={120} borderWidth={1}>
          <Text fontSize={14} w={'100%'} borderWidth={1}>
            {data?.data.content ?? ''}
          </Text>
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default CommunityContent;
