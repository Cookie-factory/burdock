import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

/**
 *@description column view
 */
function VStack(props: ViewProps) {
  return <View {...props} style={[style.view, props.style]} />;
}

const style = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
});

export default VStack;
