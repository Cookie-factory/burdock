import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {PressableProps} from '~/types/style';

/**
 *@description center style button
 */
function CenterButton(props: PressableProps) {
  return <Pressable {...props} style={[style.button, props.style]} />;
}

const style = StyleSheet.create({
  button: {
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenterButton;
