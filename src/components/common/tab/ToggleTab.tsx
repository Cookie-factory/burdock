import React from 'react';
import CenterButton from '../button/CenterButton';
import CustomText from '../text/Text';
import {colors} from '~/constants/style';

interface Props {
  name: string;
  onPress: () => void;
  isActive: boolean;
}
function ToggleTab({name, onPress, isActive}: Props) {
  return (
    <CenterButton
      height={40}
      flex={1}
      onPress={onPress}
      borderBottomWidth={1}
      borderBottomColor={isActive ? colors.gray[80] : colors.gray[40]}>
      <CustomText
        fontSize={14}
        color={isActive ? colors.gray[90] : colors.gray[60]}>
        {name}
      </CustomText>
    </CenterButton>
  );
}

export default ToggleTab;
