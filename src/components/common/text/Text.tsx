import React from 'react';
import {Text, TextProps} from 'react-native';
import {colors} from '~/constants/style';
import {CustomTextStyle, CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description text style button
 */
function CustomText(props: CustomUIProps<TextProps, CustomTextStyle>) {
  const transformStyle = styleTransform(props, {
    fontSize: 12,
    color: colors.gray[90],
  });
  return <Text {...props} style={[transformStyle, props.style]} />;
}

export default CustomText;
