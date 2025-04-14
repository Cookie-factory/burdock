import React, {useState} from 'react';
import CustomText from '../text/Text';
import CenterButton from './CenterButton';
import {colors} from '~/constants/style';

interface Props {
  placeHolder: string;
  text?: string;
}
function CharacterPageMoveButton({placeHolder, text}: Props) {
  return (
    <CenterButton
      alignItems="flex-start"
      pl={16}
      h={48}
      borderWidth={3}
      borderColor={text ? colors.positive[-10] : colors.gray[40]}
      borderRadius={14}>
      <CustomText fontSize={14} color={colors.gray[text ? 80 : 40]}>
        {text ?? placeHolder}
      </CustomText>
    </CenterButton>
  );
}

export default CharacterPageMoveButton;
