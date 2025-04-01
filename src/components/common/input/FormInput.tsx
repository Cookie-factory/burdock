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
  const [isFocus, setIsFocus] = useState(false);

  return (
    <CustomInput
      onFocus={args => {
        if (props.onFocus) {
          props.onFocus(args);
        }
        setIsFocus(true);
      }}
      onBlur={args => {
        if (props.onBlur) {
          props.onBlur(args);
        }

        setIsFocus(false);
      }}
      pl={16}
      h={48}
      fontSize={14}
      placeholderTextColor={colors.gray[40]}
      {...props}
      containerStyle={{
        ...props.containerStyle,
        borderWidth: isFocus ? 4 : 3,
        borderColor: isFocus ? colors.positive[-10] : colors.gray[40],
        borderRadius: 14,
      }}
    />
  );
}

export default FormInput;
