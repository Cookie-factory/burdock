import React from 'react';
import {CustomUIProps, PressableProps} from '~/types/style';
import {colors} from '~/constants/style';
import CenterButton from '../button/CenterButton';
import CustomText from '../text/Text';
import {Icon} from 'react-native-paper';
import VStack from '../view/VStack';

interface Props {
  text?: string;
  placeholder?: string;
}

/**
 *@description Selector 스타일 공통 컴포넌트
 */
function CustomSelector(props: CustomUIProps<PressableProps> & Props) {
  return (
    <CenterButton
      h={48}
      borderWidth={3}
      borderColor={colors.mint[50]}
      borderRadius={16}
      px={22}
      flexDirection="row"
      justifyContent="space-between"
      {...props}>
      <VStack w={20} />

      {props.text && (
        <CustomText fontSize={16} color={colors.gray[80]}>
          {props.text}
        </CustomText>
      )}

      {!props.text && (
        <CustomText fontSize={16} color={colors.gray[40]}>
          {props.placeholder ?? ''}
        </CustomText>
      )}

      <Icon source="chevron-down" size={22} color={colors.mint[50]} />
    </CenterButton>
  );
}

export default CustomSelector;
