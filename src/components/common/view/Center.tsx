import React from 'react';
import {View} from 'react-native';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description center view
 */
function Center(props: CustomUIProps) {
  const transformStyle = styleTransform(props, {
    justifyContent: 'center',
    alignItems: 'center',
  });

  return <View {...props} style={[transformStyle, props.style]} />;
}

export default Center;
