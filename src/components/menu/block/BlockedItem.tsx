import React from 'react';
import Image from '~/components/common/image/Image';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import {BlockedUser} from '~/types/api/block';
import NonBlockedButton from './NonBlockedButton';

interface Props {
  data: BlockedUser;
  refetch: () => void;
}

/**
 *@description 팔로우, 팔로워, 구독자 데이터 아이템
 */
function BlockedItem({data, refetch}: Props) {
  return (
    <HStack mb={12} justifyContent="space-between">
      <HStack w="auto" gap={18}>
        <Image
          borderWidth={1}
          borderColor={colors.gray[30]}
          w={50}
          h={50}
          borderRadius={50}
          source={{
            uri: data.blocked.profile ?? '',
          }}
        />

        <VStack w="auto" gap={4} alignItems="flex-start">
          <CustomText color={colors.gray[80]} fontSize={14} fontWeight={'bold'}>
            {data.blocked.nickname}
          </CustomText>
        </VStack>
      </HStack>

      <NonBlockedButton refetch={refetch} blockedId={data.blocked.id} />
    </HStack>
  );
}

export default BlockedItem;
