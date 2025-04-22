import React, {useState} from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import {colors} from '~/constants/style';
import {CustomUIProps, PressableProps} from '~/types/style';

interface Props {
  text: string;
  onPress: () => void;
  isActive: boolean;
}
function DateToggleButton({
  text,
  onPress,
  isActive,
  ...props
}: Props & CustomUIProps<PressableProps>) {
  return (
    <CenterButton
      borderColor={isActive ? colors.positive[0] : colors.gray[50]}
      onPress={onPress}
      w={64}
      h={34}
      borderWidth={1}
      {...props}>
      <CustomText
        fontWeight={isActive ? 'bold' : 500}
        color={isActive ? colors.positive[0] : colors.gray[50]}>
        {text}
      </CustomText>
    </CenterButton>
  );
}

export default DateToggleButton;
