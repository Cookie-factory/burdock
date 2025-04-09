import React from 'react';
import {CustomUIProps} from '~/types/style';
import HStack from './HStack';
import {colors} from '~/constants/style';

/**
 *@description Bin view
 */
function BinStack(props: CustomUIProps) {
  return <HStack bgColor={colors.gray[10]} {...props} />;
}

export default BinStack;
