import React, {useState} from 'react';
import HStack from './HStack';
import Text from '../text/Text';
import {colors} from '~/constants/style';
import CenterButton from '../button/CenterButton';
import IconRight16 from '~/assets/icons/IconRight16.svg';

interface Props {
  text: string;
  onPress: () => void;
}
function MoreView({text, onPress}: Props) {
  return (
    <HStack pt={10} pb={16} justifyContent="space-between" alignItems="center">
      <Text fontWeight={'bold'} fontSize={16} color={colors.gray[80]}>
        {text}
      </Text>

      <CenterButton width={48} h={34} onPress={onPress}>
        <HStack>
          <Text fontWeight={'bold'} fontSize={12} color={colors.gray[80]}>
            더보기
          </Text>

          <IconRight16 />
        </HStack>
      </CenterButton>
    </HStack>
  );
}

export default MoreView;
