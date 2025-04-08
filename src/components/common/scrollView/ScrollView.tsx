import React from 'react';
import {ScrollViewProps} from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView as GestureScrollView,
} from 'react-native-gesture-handler';

/**
 *@description 공통 스크롤뷰
 */
function ScrollView(props: ScrollViewProps) {
  return (
    <GestureHandlerRootView style={{width: '100%'}}>
      <GestureScrollView bounces={false} {...props} />
    </GestureHandlerRootView>
  );
}

export default ScrollView;
