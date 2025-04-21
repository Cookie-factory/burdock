import React from 'react';
import CustomActionSheet from '../modal/CustomActionSheet';
import VStack from '../view/VStack';
import {colors} from '~/constants/style';
import CenterButton from '../button/CenterButton';
import CustomText from '../text/Text';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isAuthor: boolean;
  onFirstPress: () => void;
  onSecondPress: () => void;
}

/**
 *@description 글/댓글 키밥메뉴 컴포넌트
 */
function WritingKebabMenu({
  isOpen,
  onClose,
  isAuthor,
  onFirstPress,
  onSecondPress,
}: Props) {
  return (
    <CustomActionSheet isOpen={isOpen} onClose={onClose}>
      <VStack
        px={20}
        pb={40}
        bgColor={colors.gray[0]}
        position="absolute"
        bottom={0}>
        <CenterButton
          h={48}
          onPress={onFirstPress}
          borderBottomWidth={1}
          borderColor={colors.gray[50]}>
          <CustomText>{isAuthor ? '수정' : '차단'}</CustomText>
        </CenterButton>

        <CenterButton h={48} onPress={onSecondPress}>
          <CustomText>{isAuthor ? '삭제' : '신고'}</CustomText>
        </CenterButton>
      </VStack>
    </CustomActionSheet>
  );
}

export default WritingKebabMenu;
