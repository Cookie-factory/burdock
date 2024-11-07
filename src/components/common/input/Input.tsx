import React, {PropsWithChildren} from 'react';
import {TextInput} from 'react-native';
import {TextInputProps} from 'react-native-paper';
import {CustomUIProps, CustomViewStyle} from '~/types/style';
import {styleTransform} from '~/utils/style';
import HStack from '../view/HStack';

interface Props {
  containerStyle?: CustomViewStyle;
}

/**
 *@description Input style button
 */
function CustomInput(
  props: PropsWithChildren<
    CustomUIProps<TextInputProps, CustomViewStyle> & Props
  >,
) {
  const transformStyle = styleTransform(props, {
    paddingLeft: 14,
    minHeight: 32,
    alignItems: 'center',
    flex: 1,
    // borderWidth: 1,
  });
  return (
    <HStack {...props.containerStyle}>
      <TextInput {...props} style={[transformStyle, props.style]} />

      {props.children}
    </HStack>
  );
}

export default CustomInput;
