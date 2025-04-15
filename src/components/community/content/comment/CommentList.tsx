import React from 'react';
import VStack from '~/components/common/view/VStack';
import CommentItem from './CommentItem';
import {useGetCommentList} from '~/apis/comment/hook';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {CommentItem as CommentItemType} from '~/types/api/comment/index';
interface Props {}

/**
 *@description 댓글 목록 뷰
 */
function CommentList() {
  const {refetch, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useGetCommentList({
      cursor: null,
      take: 20,
    });

  const commentListData = data
    ? data?.pages.flatMap(item => {
        return item.data;
      })
    : [];

  if (data) {
    console.log('@ COMMENT');
    console.log('@ COMMENT');
    console.log('@ COMMENT');
    console.log(commentListData);
  }
  // const isContentLoading = isFetching || isLoading || isInitialLoading;

  const onExpandList = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useFocusScreen(() => {
    refetch();
  });

  return (
    <VStack>
      <KeyboardAwareFlatList
        style={{
          flex: 1,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        data={commentListData ?? []}
        bounces={false}
        onEndReached={onExpandList}
        onEndReachedThreshold={0.5}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          const _item = item as CommentItemType;
          return <CommentItem {..._item} refetch={refetch} />;
          // return <CommentItem data={_item} />;
        }}
      />
    </VStack>
  );
}

export default CommentList;
