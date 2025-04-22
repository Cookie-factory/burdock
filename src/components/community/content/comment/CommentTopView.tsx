import React from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import {colors} from '~/constants/style';
import {SelectedCommentType} from '~/types/api/comment';

interface Props {
  commentType: SelectedCommentType['type'];
  targetName: string;
}

/**
 *@description 어떤 유저한테 쓰는지 뷰
 */
function CommentTopView({targetName, commentType}: Props) {
  return (
    <HStack justifyContent="space-between" py={8} mt={12} mb={6}>
      <HStack w="auto">
        <HStack
          w={28}
          h={28}
          mr={15}
          bgColor={colors.gray[60]}
          borderRadius={28}
        />

        <CustomText fontWeight={'bold'} fontSize={10}>
          {commentType === 'MODIFY' || commentType === 'RECOMMENT'
            ? targetName
            : '댓글달기'}
        </CustomText>

        <CustomText fontSize={10}>
          {commentType === 'MODIFY'
            ? '님의 댓글 수정하기'
            : commentType === 'RECOMMENT'
            ? '님에게 답글달기'
            : ''}
        </CustomText>
      </HStack>
    </HStack>
  );
}

export default CommentTopView;
