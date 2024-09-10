import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

/**
 *@description column view
 */
function VStack(props: ViewProps) {
  return <View style={style.view} {...props} />;
}

const style = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
});

export default VStack;
