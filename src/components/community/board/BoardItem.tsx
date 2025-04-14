import React from 'react';
import VStack from '~/components/common/view/VStack';
import {BoardItem as BoardItemType} from '~/types/api/board';
import CenterButton from '~/components/common/button/CenterButton';
import HStack from '~/components/common/view/HStack';
import Text from '~/components/common/text/Text';
import useNavigate from '~/hooks/navigator/useNavigation';
import {colors} from '~/constants/style';
import IconDefaultHeart12 from '~/assets/icons/IconDefaultHeart12.svg';
import IconSpeechBubble13 from '~/assets/icons/IconSpeechBubble13.svg';
import IconDefaultBookmark9 from '~/assets/icons/IconDefaultBookmark9.svg';
import getTimeFromNow from '~/utils/time';
import Image from '~/components/common/image/Image';

interface Props {
  data: BoardItemType;
}

/**
 *@description 게시판 리스트 항목
 */
function BoardItem({data}: Props) {
  const {navigate} = useNavigate();

  const infoTextStyle = {
    color: colors.gray[80],
    fontSzie: 10,
  };

  const onMoveContent = (id: string) => {
    navigate('CommunityContent', {id});
  };

  return (
    <CenterButton
      onPress={() => onMoveContent(data.id)}
      w="100%"
      borderBottomColor={colors.gray[30]}
      borderBottomWidth={2}>
      <HStack my={12} h={80}>
        <VStack h={80} flex={1} justifyContent="space-between">
          <VStack alignItems="flex-start">
            <HStack marginBottom={4} width={'auto'} alignItems="center">
              <VStack
                mr={15}
                w={24}
                h={24}
                borderRadius={24}
                bgColor={colors.gray[80]}
              />

              <Text fontSize={10} fontWeight={'bold'}>
                {data.author.nickname}
              </Text>
            </HStack>

            <Text fontSize={11} color={colors.gray[90]}>
              {data.title}
            </Text>
          </VStack>

          <HStack justifyContent="flex-start" gap={12}>
            <HStack w="auto" gap={6}>
              <IconDefaultHeart12 />

              <Text {...infoTextStyle}>{data._count.like}</Text>
            </HStack>

            <HStack w="auto" gap={6}>
              <IconSpeechBubble13 />

              <Text {...infoTextStyle}>{data._count.comment}</Text>
            </HStack>

            <HStack w="auto" gap={6}>
              <IconDefaultBookmark9 />

              <Text {...infoTextStyle}>{data._count.bookmark}</Text>
            </HStack>

            <Text {...infoTextStyle}>{getTimeFromNow(data.updatedAt)}</Text>
          </HStack>
        </VStack>

        <Image
          w={80}
          h={80}
          source={{
            uri: data.images[0] ?? null,
            // uri: 'https://i.namu.wiki/i/Q--xh7Fdq_iGi_wFeW0v2FqiN11HrWHPDiLADLPZXL0dqlNwmVGIj6U-FQwhCyurszC9TXO6WXfhlXa1Nb06E-k6F3kYyA91mpFZ35mHyg2N8MHS9Y4NCkJ-pgfdb3jmj1hYpIk-bLNlQtfWjOSCOg.webp',
          }}
        />
      </HStack>
    </CenterButton>
  );
}

export default BoardItem;
