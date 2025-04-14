import React, {useState} from 'react';
import VStack from '~/components/common/view/VStack';
import CommentItem from './CommentItem';

interface Props {}

/**
 *@description 댓글 목록 뷰
 */
function CommentList() {
  return (
    <VStack>
      <CommentItem />
      <CommentItem />
    </VStack>
  );
}

export default CommentList;
