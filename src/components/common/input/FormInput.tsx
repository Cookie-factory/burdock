import React, {PropsWithChildren, useState} from 'react';
import CustomInput from './Input';
import {CustomUIProps, CustomViewStyle} from '~/types/style';
import {TextInputProps} from 'react-native-paper';
import {colors} from '~/constants/style';

interface Props {
  containerStyle?: CustomViewStyle;
}

/**
 *@description 폼 input 스타일 공통 컴포넌트
 */
function FormInput(
  props: PropsWithChildren<
    CustomUIProps<TextInputProps, CustomViewStyle> & Props
  >,
) {
  // focus에 따른 input 스타일 변경 state
  const [calStyle, setCalStyle] = useState({
    borderWidth: 0,
  });

  return (
    <CustomInput
      onFocus={args => {
        if (props.onFocus) {
          props.onFocus(args);
        }
        setCalStyle({
          borderWidth: 1,
        });
      }}
      onBlur={args => {
        if (props.onBlur) {
          props.onBlur(args);
        }
        setCalStyle({
          borderWidth: 0,
        });
      }}
      pl={16}
      h={48}
      fontSize={16}
      placeholderTextColor={colors.gray[40]}
      {...props}
      containerStyle={{
        ...props.containerStyle,
        borderWidth: 3 + calStyle.borderWidth,
        borderColor: colors.mint[50],
        borderRadius: 14,
      }}
    />
  );
}

export default FormInput;
