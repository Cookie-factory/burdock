import React from 'react';
import {View} from 'react-native';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description row view
 */
function HStack(props: CustomUIProps) {
  const transformStyle = styleTransform(props, {
    flexDirection: 'row',
    alignItems: 'center',
  });

  return <View {...props} style={[transformStyle, props.style]} />;
}

export default HStack;
