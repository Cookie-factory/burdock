import React from 'react';
import {Pressable} from 'react-native';
import {CustomUIProps, PressableProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description center style button
 */
function CenterButton(props: CustomUIProps<PressableProps>) {
  const transformStyle = styleTransform(props, {
    borderWidth: 1,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  });
  return <Pressable {...props} style={[transformStyle, props.style]} />;
}

export default CenterButton;
