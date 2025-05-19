import React from 'react';
import FollowButton from '~/components/common/button/FollowButton';
import Image from '~/components/common/image/Image';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import {FollowItemType} from '~/types/api/follow';

interface Props {
  data: FollowItemType;
  refetch: () => void;
}

/**
 *@description 팔로우, 팔로워, 구독자 데이터 아이템
 */
function FollowItem({data, refetch}: Props) {
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
            uri: data.profile ?? '',
          }}
        />

        <VStack w="auto" gap={4} alignItems="flex-start">
          <CustomText color={colors.gray[80]} fontSize={14} fontWeight={'bold'}>
            {data.nickname}
          </CustomText>

          <CustomText color={colors.gray[70]} fontSize={10}>
            {data.introduce}
          </CustomText>
        </VStack>
      </HStack>

      <FollowButton
        isActive={data.check}
        refetch={refetch}
        targetUserId={data.id}
      />
    </HStack>
  );
}

export default FollowItem;
