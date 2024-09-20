import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

/**
 *@description row view
 */
function HStack(props: ViewProps) {
  return <View {...props} style={[style.view, props.style]} />;
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HStack;
