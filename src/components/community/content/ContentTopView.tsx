import React from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import IconMore24 from '~/assets/icons/IconMore24.svg';
import CenterButton from '~/components/common/button/CenterButton';
import {colors} from '~/constants/style';

/**
 *@description 게시글 상단 -> 유저, 추가 기능 버튼 뷰
 */
function ContentTopView() {
  return (
    <HStack justifyContent="space-between" px={20} py={8}>
      <HStack w="auto">
        <HStack
          w={28}
          h={28}
          mr={15}
          bgColor={colors.gray[60]}
          borderRadius={28}
        />

        <CustomText fontWeight={'bold'} fontSize={10}>
          hit_tester
        </CustomText>
      </HStack>

      <CenterButton w={38} h={38}>
        <IconMore24 />
      </CenterButton>
    </HStack>
  );
}

export default ContentTopView;
