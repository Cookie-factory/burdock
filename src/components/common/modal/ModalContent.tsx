import React from 'react';
import VStack from '../view/VStack';
import {CustomUIProps} from '~/types/style';

/**
 *@description modal content common component
 */
function CustomModalContent(props: CustomUIProps) {
  return (
    <VStack
      bgColor={'#fff'}
      py={24}
      px={18}
      minH={200}
      {...props}
      borderRadius={16}
    />
  );
}

export default CustomModalContent;
