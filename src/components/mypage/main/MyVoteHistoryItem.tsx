import React from 'react';
import Image from '~/components/common/image/Image';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import {VoteMyHistoryItem} from '~/types/api/vote';

interface Props {
  data: VoteMyHistoryItem;
}

/**
 *@description 나의 투표 히스토리 항목
 */
function MyVoteHistoryItem({data}: Props) {
  return (
    <HStack
      mb={12}
      h={80}
      justifyContent="space-between"
      borderBottomWidth={2}
      borderBottomColor={colors.gray[30]}>
      <HStack w="auto" gap={18}>
        <Image
          borderWidth={1}
          borderColor={colors.gray[30]}
          w={36}
          h={36}
          borderRadius={36}
          source={{
            uri: data?.candidate?.character?.profile ?? '',
          }}
        />

        <VStack w="auto" gap={4} alignItems="flex-start">
          <CustomText color={colors.gray[80]} fontSize={14} fontWeight={'bold'}>
            {data?.candidate?.character?.name ?? ''}
          </CustomText>

          <CustomText color={colors.gray[70]} fontSize={10}>
            {data?.voteSubject?.title ?? ''}
          </CustomText>
        </VStack>
      </HStack>

      <CustomText>{data?.count ?? 0} 표</CustomText>
    </HStack>
  );
}

export default MyVoteHistoryItem;
