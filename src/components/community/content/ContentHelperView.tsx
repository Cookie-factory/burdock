import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import HStack from '~/components/common/view/HStack';
import IconDefaultHeart12 from '~/assets/icons/IconDefaultHeart12.svg';
import IconSpeechBubble13 from '~/assets/icons/IconSpeechBubble13.svg';
import IconDefaultBookmark9 from '~/assets/icons/IconDefaultBookmark9.svg';
import IconActiveBookmark9 from '~/assets/icons/IconActiveBookmark9.svg';
import IconActiveHeart12 from '~/assets/icons/IconActiveHeart12.svg';
import {colors} from '~/constants/style';
import Text from '~/components/common/text/Text';
import getTimeFromNow from '~/utils/time';
import {BoardInfoCount} from '~/types/api/board';

interface Props {
  boardInfoCount?: BoardInfoCount;
  updatedAt?: string;
  onBookmark: () => void;
  isBookmark?: boolean;
  onLike: () => void;
  isLike?: boolean;
}

/**
 *@description 내용 추가 뷰 (좋아요, 댓글, 북마크)
 */
function ContentHelperView({
  boardInfoCount,
  updatedAt,
  onBookmark,
  isBookmark,
  onLike,
  isLike,
}: Props) {
  const infoTextStyle = {
    color: colors.gray[80],
    fontSize: 10,
  };

  return (
    <HStack pt={16} pb={12}>
      <HStack justifyContent="flex-start" gap={12}>
        <CenterButton flexDirection="row" w="auto" gap={6} onPress={onLike}>
          {isLike ? <IconActiveHeart12 /> : <IconDefaultHeart12 />}
          {/* {isLike ? <IconActiveHeart12 /> : <IconDefaultHeart12 />} */}

          <Text {...infoTextStyle}>{boardInfoCount?.like ?? 0}</Text>
        </CenterButton>

        <CenterButton flexDirection="row" w="auto" gap={6}>
          <IconSpeechBubble13 />

          <Text {...infoTextStyle}>{boardInfoCount?.comment ?? 0}</Text>
        </CenterButton>

        <CenterButton flexDirection="row" w="auto" gap={6} onPress={onBookmark}>
          {isBookmark ? <IconActiveBookmark9 /> : <IconDefaultBookmark9 />}

          <Text {...infoTextStyle}>{boardInfoCount?.bookmark ?? 0}</Text>
        </CenterButton>

        <Text {...infoTextStyle}>{getTimeFromNow(updatedAt ?? '')}</Text>
      </HStack>
    </HStack>
  );
}

export default ContentHelperView;
