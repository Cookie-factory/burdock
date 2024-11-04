import React from 'react';
import {TextInput} from 'react-native';
import {TextInputProps} from 'react-native-paper';
import {CustomUIProps, CustomViewStyle} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description Input style button
 */
function CustomInput(props: CustomUIProps<TextInputProps, CustomViewStyle>) {
  const transformStyle = styleTransform(props, {
    borderWidth: 1,
    paddingLeft: 14,
    minHeight: 32,
    alignItems: 'center',
    width: '100%',
  });
  return <TextInput {...props} style={[transformStyle, props.style]} />;
}

export default CustomInput;
