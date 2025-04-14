import React from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import {colors} from '~/constants/style';

interface Props {}

/**
 *@description 어떤 유저한테 쓰는지 뷰
 */
function CommentTopView() {
  return (
    <HStack justifyContent="space-between" py={8} mb={6}>
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

        <CustomText fontSize={10}>님에게 댓글 달기</CustomText>
      </HStack>
    </HStack>
  );
}

export default CommentTopView;
