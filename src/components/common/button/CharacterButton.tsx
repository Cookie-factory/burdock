import React from 'react';
import CustomText from '../text/Text';
import CenterButton from './CenterButton';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';

interface Props {
  placeHolder: string;
  text?: string;
}

/**
 *@description 캐릭터 검색 페이지 이동 버튼
 */
function CharacterPageMoveButton({placeHolder, text}: Props) {
  const {navigate} = useNavigate();

  return (
    <CenterButton
      onPress={() => navigate('CharacterSearch')}
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
