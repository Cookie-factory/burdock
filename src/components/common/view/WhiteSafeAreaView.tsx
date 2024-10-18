import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '~/constants/style';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description white SafeAreaView
 */
function WhiteSafeAreaView(props: CustomUIProps) {
  const transformStyle = styleTransform(props, {
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.gray[0],
    flex: 1,
  });
  return <SafeAreaView {...props} style={[transformStyle, props.style]} />;
}

export default WhiteSafeAreaView;
