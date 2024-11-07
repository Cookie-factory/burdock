import React from 'react';
import VStack from '../view/VStack';
import {CustomUIProps} from '~/types/style';

/**
 *@description page inner layout 공통 컴포넌트
 */
function InnerLayout(props: CustomUIProps) {
  return <VStack flex={1} px={20} borderWidth={1} {...props} />;
}

export default InnerLayout;
