import React from 'react';
import {View} from 'react-native';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description column view
 */
function VStack(props: CustomUIProps) {
  const transformStyle = styleTransform(props, {
    alignItems: 'center',
    width: '100%',
  });
  return <View {...props} style={[transformStyle, props.style]} />;
}

export default VStack;
