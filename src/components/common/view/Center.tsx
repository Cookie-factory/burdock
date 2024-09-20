import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

/**
 *@description center view
 */
function Center(props: ViewProps) {
  return <View {...props} style={[style.view, props.style]} />;
}

const style = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Center;
