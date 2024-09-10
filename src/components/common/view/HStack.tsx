import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

/**
 *@description row view
 */
function HStack(props: ViewProps) {
  return <View style={style.view} {...props} />;
}

const style = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
});

export default HStack;
