import React from 'react';
import {Pressable} from 'react-native';
import {CustomUIProps, PressableProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description center style button
 */
function CenterButton(props: CustomUIProps<PressableProps>) {
  const transformStyle = styleTransform(props, {
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  });
  return <Pressable {...props} style={[transformStyle, props.style]} />;
}

export default CenterButton;
