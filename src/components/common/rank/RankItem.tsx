import React from 'react';
import {colors} from '~/constants/style';
import Text from '../text/Text';
import HStack from '../view/HStack';
import VStack from '../view/VStack';
import CustomImage from '../image/Image';

interface Props {
  rank: number;
  count: number;

  name: string;
  uri: string;
}

/**
 *@description 랭킹 아이템
 */
function RankItem({rank, count, name, uri}: Props) {
  return (
    <HStack
      justifyContent="space-between"
      alignItems={'center'}
      py={14}
      bgColor={colors.gray[0]}>
      <HStack>
        <CustomImage mr={32} w={64} h={64} source={{uri}} />

        <Text mr={24} fontSize={16} color={colors.gray[90]} fontWeight={'bold'}>
          {rank}위
        </Text>

        <VStack width="auto" alignItems="flex-start" gap={4}>
          <Text fontSize={14} fontWeight={'bold'} color={colors.gray[90]}>
            {name}
          </Text>

          <Text fontSize={12} color={colors.gray[50]}>
            {count}
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}

export default RankItem;
