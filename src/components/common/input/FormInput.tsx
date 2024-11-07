import React from 'react';
import CustomInput from './Input';
import {CustomUIProps, CustomViewStyle} from '~/types/style';
import {TextInputProps} from 'react-native-paper';
import {colors} from '~/constants/style';

/**
 *@description 폼 input 스타일 공통 컴포넌트
 */
function FormInput(props: CustomUIProps<TextInputProps, CustomViewStyle>) {
  return (
    <CustomInput
      pl={16}
      h={48}
      fontSize={16}
      borderWidth={3}
      placeholderTextColor={colors.gray[40]}
      borderColor={colors.mint[50]}
      borderRadius={16}
      {...props}
    />
  );
}

export default FormInput;
