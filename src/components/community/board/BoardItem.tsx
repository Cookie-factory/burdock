import React from 'react';
import VStack from '~/components/common/view/VStack';
import {BoardItem as BoardItemType} from '~/types/api/board';
import CenterButton from '~/components/common/button/CenterButton';
import HStack from '~/components/common/view/HStack';
import dayjs from 'dayjs';
import Text from '~/components/common/text/Text';
import useNavigate from '~/hooks/navigator/useNavigation';

interface Props {
  data: BoardItemType;
}

/**
 *@description 게시판 리스트 항목
 */
function BoardItem({data}: Props) {
  const {navigate} = useNavigate();

  const onMoveContent = (id: string) => {
    navigate('CommunityContent', {id});
  };

  return (
    <CenterButton onPress={() => onMoveContent(data.id)} my={10}>
      <VStack py={12} px={14}>
        <Text w="100%" borderWidth={1} mb={8}>
          {data.title}
        </Text>

        <HStack justifyContent="flex-end" borderWidth={1}>
          <Text mr={20}>{data.author.nickname}</Text>
          <Text>{dayjs(data.updatedAt).format('YY.MM.DD hh:mm')}</Text>
        </HStack>
      </VStack>
    </CenterButton>
  );
}

export default BoardItem;
