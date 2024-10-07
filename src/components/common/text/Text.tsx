import React from 'react';
import {Text, TextProps} from 'react-native';
import {CustomTextStyle, CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description text style button
 */
function CustomText(props: CustomUIProps<TextProps, CustomTextStyle>) {
  const transformStyle = styleTransform(props, {
    fontSize: 12,
  });
  return <Text {...props} style={[transformStyle, props.style]} />;
}

export default CustomText;
