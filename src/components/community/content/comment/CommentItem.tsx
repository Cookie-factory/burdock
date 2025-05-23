import React from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import getTimeFromNow from '~/utils/time';
import IconDefaultHeart12 from '~/assets/icons/IconDefaultHeart12.svg';
import IconActiveHeart12 from '~/assets/icons/IconActiveHeart12.svg';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import {
  CommentItem as CommentItemType,
  SelectedCommentType,
} from '~/types/api/comment';
import {usePostCommentLike} from '~/apis/comment/hook';
import {SelectedBlockedUser} from '~/types/api/block';
import {SelectedReportData} from '~/types/api/report';

interface Props {
  refetch: () => void;
  onSelectedComment: (selectedComment: SelectedCommentType) => void;
  onBlockButtonClick: (blockedUser: SelectedBlockedUser) => void;
  onReportButtonClick: (_selectedReportData: SelectedReportData) => void;
  isRecomment?: boolean;
}

function CommentItem(props: Props & CommentItemType) {
  const {mutateAsync: postCommentLikeMutate} = usePostCommentLike();

  const infoTextStyle = {
    color: colors.gray[80],
    fontSize: 10,
  };

  const onLike = () => {
    postCommentLikeMutate(props.id).then(response => {
      if (response.statusCode === 201) {
        props.refetch();
      }
    });
  };

  return (
    <HStack
      alignItems="flex-start"
      py={16}
      pl={props.isRecomment ? 20 : 0}
      borderBottomWidth={1}
      borderBottomColor={colors.gray[40]}>
      <HStack
        w={28}
        h={28}
        mr={15}
        bgColor={colors.gray[60]}
        borderRadius={28}
      />

      <VStack alignItems="flex-start" w="auto">
        <HStack justifyContent="space-between" py={8} mb={0}>
          <HStack w="auto">
            <CustomText fontWeight={'bold'} fontSize={10} mr={8}>
              {props.user?.nickname ?? ''}
            </CustomText>

            <CustomText fontSize={10}>
              {getTimeFromNow(props.updatedAt)}
            </CustomText>
          </HStack>
        </HStack>

        <VStack
          alignItems="flex-start"
          borderLeftWidth={props.isRecomment ? 2 : 0}
          borderLeftColor={colors.gray[30]}
          pl={props.isRecomment ? 16 : 0}>
          {props.deletedAt ? (
            <CustomText {...infoTextStyle} py={12}>
              삭제된 댓글입니다.
            </CustomText>
          ) : (
            <VStack alignItems="flex-start">
              <HStack my={10} alignItems="flex-start" minH={32} w={'auto'}>
                <Text {...infoTextStyle}>
                  {props.isRecomment && (
                    <Text {...infoTextStyle} color={colors.positive[0]}>
                      @{props.targetUser?.nickname}
                      <Text> </Text>
                    </Text>
                  )}
                  {props.content}
                </Text>
              </HStack>

              <HStack w={'auto'} gap={20}>
                <CenterButton
                  flexDirection="row"
                  w="auto"
                  gap={6}
                  width={32}
                  onPress={onLike}>
                  {props.isLike ? (
                    <IconActiveHeart12 />
                  ) : (
                    <IconDefaultHeart12 />
                  )}

                  <Text {...infoTextStyle}>{props._count.commentLike}</Text>
                </CenterButton>

                <CenterButton
                  width={32}
                  h={32}
                  onPress={() =>
                    props.onSelectedComment({
                      type: 'RECOMMENT',
                      ...props,
                      targetUserId: props.userId,
                      id: props.parentId ?? props.id,
                    })
                  }>
                  <Text {...infoTextStyle}>답글</Text>
                </CenterButton>

                {props.isAuth && (
                  <CenterButton
                    width={32}
                    h={32}
                    onPress={() =>
                      props.onSelectedComment({
                        type: 'DELETE',
                        ...props,
                      })
                    }>
                    <Text {...infoTextStyle}>삭제</Text>
                  </CenterButton>
                )}

                {props.isAuth && (
                  <CenterButton
                    width={32}
                    h={32}
                    onPress={() =>
                      props.onSelectedComment({
                        type: 'MODIFY',
                        ...props,
                      })
                    }>
                    <Text {...infoTextStyle}>수정</Text>
                  </CenterButton>
                )}

                {!props.isAuth && (
                  <CenterButton
                    width={32}
                    h={32}
                    onPress={() =>
                      props.onBlockButtonClick({
                        targetUserId: props.userId,
                        targetUserNickname: props.user.nickname,
                      })
                    }>
                    <Text {...infoTextStyle}>차단</Text>
                  </CenterButton>
                )}

                {!props.isAuth && (
                  <CenterButton
                    onPress={() =>
                      props.onReportButtonClick({
                        targetId: props.id,
                        targetType: 'COMMENT',
                        targetUserId: props.userId,
                      })
                    }
                    width={32}
                    h={32}>
                    <Text {...infoTextStyle}>신고</Text>
                  </CenterButton>
                )}
              </HStack>
            </VStack>
          )}
        </VStack>
      </VStack>
    </HStack>
  );
}

export default CommentItem;
