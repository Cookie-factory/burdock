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
import {CommentItem as CommentItemType} from '~/types/api/comment';
import {usePostCommentLike} from '~/apis/comment/hook';

interface Props {
  refetch: () => void;
}
function CommentItem(props: Props & CommentItemType) {
  const {mutateAsync: postCommentLike} = usePostCommentLike();
  const infoTextStyle = {
    color: colors.gray[80],
    fontSize: 10,
  };

  const onLike = () => {
    postCommentLike(props.id).then(response => {
      if (response.statusCode === 201) {
        props.refetch();
      }
    });
  };

  return (
    <HStack
      alignItems="flex-start"
      py={16}
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

            <CustomText fontSize={10}>{getTimeFromNow('20250404')}</CustomText>
          </HStack>
        </HStack>

        <HStack my={10} alignItems="flex-start" minH={32} w={'auto'}>
          <Text {...infoTextStyle}>{props.content}</Text>
        </HStack>

        <HStack w={'auto'} gap={20}>
          <CenterButton
            flexDirection="row"
            w="auto"
            gap={6}
            width={32}
            onPress={onLike}>
            {props.isLike ? <IconActiveHeart12 /> : <IconDefaultHeart12 />}

            <Text {...infoTextStyle}>{props._count.commentLike}</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>답글</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>삭제</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>차단</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>신고</Text>
          </CenterButton>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default CommentItem;
