import React from 'react';
import {TextInput, ViewStyle} from 'react-native';
import {TextInputProps} from 'react-native-paper';
import {MakeOptional} from '~/types/util/utility';
import {styleTransform} from '~/utils/style';

/**
 *@description Input style button
 */
function Input(props: MakeOptional<TextInputProps, 'style'> & ViewStyle) {
  const transformStyle = styleTransform(props, {
    borderWidth: 1,
    paddingLeft: 4,
    minHeight: 32,
    alignItems: 'center',
  });
  return <TextInput {...props} style={[transformStyle, props.style]} />;
}

export default Input;
