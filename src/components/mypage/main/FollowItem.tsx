import React, {useState} from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';

interface Props {}

/**
 *@description 팔로우, 팔로워, 구독자 데이터 아이템
 */
function FollowItem() {
  return (
    <HStack mb={12} justifyContent="space-between">
      <HStack w="auto" gap={18}>
        <VStack
          w={50}
          h={50}
          borderRadius={50}
          bgColor={colors.gray[70]}></VStack>

        <VStack w="auto" gap={4} alignItems="flex-start">
          <CustomText color={colors.gray[80]} fontSize={14} fontWeight={'bold'}>
            토토
          </CustomText>

          <CustomText color={colors.gray[70]} fontSize={10}>
            잘 부탁드려요!~
          </CustomText>
        </VStack>
      </HStack>

      <CenterButton
        borderRadius={8}
        w={106}
        h={32}
        bgColor={colors.positive[0]}>
        <CustomText fontWeight={'bold'} color={colors.gray[0]}>
          맞팔로우
        </CustomText>
      </CenterButton>
    </HStack>
  );
}

export default FollowItem;
