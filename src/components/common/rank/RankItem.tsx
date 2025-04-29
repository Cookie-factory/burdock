import React from 'react';
import {colors} from '~/constants/style';
import Text from '../text/Text';
import HStack from '../view/HStack';
import VStack from '../view/VStack';
import CustomImage from '../image/Image';
import CenterButton from '../button/CenterButton';
import CustomText from '../text/Text';
import IconRight16 from '~/assets/icons/IconRight16.svg';
import {RankVoteItem} from '~/types/api/vote';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  data: RankVoteItem;
  onVoteModalOpen: (id: string) => void;
  subjectTotalVotes?: number;
}

/**
 *@description 랭킹 아이템
 */
function RankItem({data, onVoteModalOpen, subjectTotalVotes = 1}: Props) {
  return (
    <HStack
      justifyContent="space-between"
      alignItems={'center'}
      py={14}
      bgColor={colors.gray[0]}>
      <HStack justifyContent="space-between">
        <HStack w="auto">
          <CustomImage
            borderWidth={1}
            mr={32}
            w={64}
            h={64}
            source={{uri: data.profile}}
          />

          <Text
            mr={24}
            fontSize={16}
            color={colors.gray[90]}
            fontWeight={'bold'}>
            {data.rank}위
          </Text>

          <VStack width="auto" alignItems="flex-start" gap={4}>
            <Text fontSize={14} fontWeight={'bold'} color={colors.gray[90]}>
              {data.name}
            </Text>

            <Text fontSize={12} color={colors.gray[70]}>
              {data.totalVotes} ({(data.totalVotes / subjectTotalVotes) * 100}
              %)
            </Text>
          </VStack>
        </HStack>

        <CenterButton
          w="auto"
          flexDirection="row"
          onPress={() => onVoteModalOpen(data.id)}>
          <CustomText>투표</CustomText>

          <IconRight16 />
        </CenterButton>
      </HStack>
    </HStack>
  );
}

export default RankItem;
