import React, {useEffect, useRef, useState} from 'react';
import VStack from '~/components/common/view/VStack';
import CommentItem from './CommentItem';
import {
  useDeleteComment,
  useGetCommentList,
  usePatchComment,
  usePostComment,
} from '~/apis/comment/hook';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {
  CommentItem as CommentItemType,
  SelectedCommentType,
} from '~/types/api/comment/index';
import Popup from '~/components/common/popup/Popup';
import FormInput from '~/components/common/input/FormInput';
import ActiveButton from '~/components/common/button/ActiveButton';
import CommentTopView from './CommentTopView';
import {TextInput} from 'react-native';

interface Props {
  boardId?: string;
}

/**
 *@description 댓글 목록 뷰
 */
function CommentList({boardId}: Props) {
  const {refetch, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useGetCommentList({
      cursor: null,
      take: 20,
      boardId,
    });
  const {mutateAsync: deleteCommentMutate} = useDeleteComment();
  const {mutateAsync: postCommentMutate} = usePostComment();
  const {mutateAsync: patchCommentMutate} = usePatchComment();
  const ref = useRef<TextInput>(null);

  const defaultSelectedComment = {
    type: 'DEFAULT',
  } as SelectedCommentType;

  const [selectedComment, setSelectedComment] = useState<SelectedCommentType>(
    defaultSelectedComment,
  );
  const [comment, setComment] = useState('');
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);

  const commentListData = data
    ? data?.pages.flatMap(item => {
        return item.data;
      })
    : [];

  /**
   *@description 댓글 선택 함수
   */
  const onSelectedComment = (data: SelectedCommentType) => {
    setSelectedComment(data);
  };

  /**
   *@description 댓글 수정 혹은 삭제
   */
  const onRegisterModifyComment = () => {
    if (boardId) {
      if (selectedComment.type === 'DEFAULT') {
        // 등록
        postCommentMutate({
          content: comment,
          boardId,
        }).then(response => {
          if (response.statusCode === 201) {
            setComment('');
            refetch();
          }
        });
      } else if (selectedComment.type === 'MODIFY') {
        // 수정

        if (selectedComment.id) {
          patchCommentMutate({
            id: selectedComment.id,
            content: comment,
          }).then(response => {
            console.log(response.statusCode);

            if (response.statusCode === 200) {
              setSelectedComment(defaultSelectedComment);
              setComment('');
              refetch();
            }
          });
        }
      } else if (selectedComment.type === 'RECOMMENT') {
        // 답글
        if (selectedComment.id) {
          postCommentMutate({
            parentId: selectedComment.id,
            content: comment,
            boardId,
            targetUserId: selectedComment.userId,
          }).then(response => {
            console.log(response.statusCode);

            if (response.statusCode === 201) {
              setSelectedComment(defaultSelectedComment);
              setComment('');
              refetch();
            }
          });
        }
      }
    }
  };

  /**
   *@description 댓글 리스트 확장
   */
  const onExpandList = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  /**
   *@description 댓글 삭제
   */
  const onDelete = () => {
    if (selectedComment.id) {
      deleteCommentMutate(selectedComment.id).then(response => {
        if (response.statusCode === 200) {
          setSelectedComment(defaultSelectedComment);
          refetch();
        }
      });
    }
  };

  useFocusScreen(() => {
    refetch();
  });

  useEffect(() => {
    if (selectedComment.type === 'MODIFY') {
      // ref.current.focus();
      setComment(selectedComment.content ?? '');
    } else if (selectedComment.type === 'DELETE') {
      // 삭제
      setShowDeletePopup(true);
    } else if (selectedComment.type === 'RECOMMENT') {
      // ref.current.focus();
      setComment('');
    }
  }, [selectedComment]);

  return (
    <VStack>
      <CommentTopView
        commentType={selectedComment.type}
        targetName={selectedComment.user?.nickname ?? ''}
      />

      <FormInput
        ref={ref}
        p={16}
        h={132}
        multiline
        label="댓글"
        placeholder={
          selectedComment.type === 'MODIFY'
            ? '댓글 수정하기'
            : selectedComment.type === 'RECOMMENT'
            ? '답글달기'
            : '댓글달기'
        }
        onChangeText={text => setComment(text)}
        value={comment}
      />

      <ActiveButton
        my={20}
        onPress={onRegisterModifyComment}
        buttonType="blue"
        text={
          selectedComment.type === 'MODIFY'
            ? '수정하기'
            : selectedComment.type === 'RECOMMENT'
            ? '답글달기'
            : '등록하기'
        }
      />

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
            return (
              <VStack>
                <CommentItem
                  {..._item}
                  refetch={refetch}
                  onSelectedComment={onSelectedComment}
                />
                {_item.recomment.map(_recommentItem => (
                  <CommentItem
                    {..._recommentItem}
                    refetch={refetch}
                    onSelectedComment={onSelectedComment}
                    isRecomment={true}
                  />
                ))}
              </VStack>
            );
          }}
        />
      </VStack>

      <Popup
        isOpen={isShowDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onOkPress={onDelete}
        onCancelPress={() => setShowDeletePopup(false)}
        okText={'삭제'}
        cancelText={'취소'}
        title={'삭제하시겠습니까?'}
      />
    </VStack>
  );
}

export default CommentList;
