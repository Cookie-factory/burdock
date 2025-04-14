import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import HStack from '~/components/common/view/HStack';
import IconDefaultHeart12 from '~/assets/icons/IconDefaultHeart12.svg';
import IconSpeechBubble13 from '~/assets/icons/IconSpeechBubble13.svg';
import IconDefaultBookmark9 from '~/assets/icons/IconDefaultBookmark9.svg';
import {colors} from '~/constants/style';
import Text from '~/components/common/text/Text';
import getTimeFromNow from '~/utils/time';

interface Props {}

/**
 *@description 내용 추가 뷰 (좋아요, 댓글, 북마크)
 */
function ContentHelperView() {
  const infoTextStyle = {
    color: colors.gray[80],
    fontSize: 10,
  };

  return (
    <HStack pt={16} pb={12}>
      <HStack justifyContent="flex-start" gap={12}>
        <CenterButton flexDirection="row" w="auto" gap={6}>
          <IconDefaultHeart12 />

          <Text {...infoTextStyle}>120</Text>
        </CenterButton>

        <CenterButton flexDirection="row" w="auto" gap={6}>
          <IconSpeechBubble13 />

          <Text {...infoTextStyle}>120</Text>
        </CenterButton>

        <CenterButton flexDirection="row" w="auto" gap={6}>
          <IconDefaultBookmark9 />

          <Text {...infoTextStyle}>120</Text>
        </CenterButton>

        <Text {...infoTextStyle}>{getTimeFromNow('20250404')}</Text>
      </HStack>
    </HStack>
  );
}

export default ContentHelperView;
