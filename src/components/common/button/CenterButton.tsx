import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {PressableProps} from '~/types/style';
import {MakeOptional} from '~/types/util/utility';

/**
 *@description center style button
 */
function CenterButton(props: MakeOptional<PressableProps, 'style'>) {
  return <Pressable {...props} style={[style.button, props.style]} />;
}

const style = StyleSheet.create({
  button: {
    borderWidth: 1,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenterButton;
