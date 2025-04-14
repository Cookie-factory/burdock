import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import IconWriting18 from '~/assets/icons/IconWriting18.svg';
import {colors, uiStyle} from '~/constants/style';

interface Props {
  onPress: () => void;
}

/**
 *@description 게시글 등록하기 버튼
 */
function RegisterButton({onPress}: Props) {
  return (
    <CenterButton
      onPress={onPress}
      w="auto"
      px={18}
      py={14}
      bgColor={colors.yellow[30]}
      position="absolute"
      flexDirection="row"
      gap={4}
      borderRadius={20}
      right={20}
      bottom={uiStyle.tab.height + 60}>
      <IconWriting18 />

      <CustomText fontWeight={'bold'} fontSize={14} color={colors.gray[0]}>
        글쓰기
      </CustomText>
    </CenterButton>
  );
}

export default RegisterButton;
