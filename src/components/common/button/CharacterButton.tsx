import React from 'react';
import CustomText from '../text/Text';
import CenterButton from './CenterButton';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';
import _ from 'lodash';
import {SelectedCharactersData} from '~/types/api/character';

interface Props {
  placeHolder: string;
  text: SelectedCharactersData[];
  isOne?: boolean;
}

/**
 *@description 캐릭터 검색 페이지 이동 버튼
 */
function CharacterPageMoveButton({placeHolder, text, isOne}: Props) {
  const {navigate} = useNavigate();

  return (
    <CenterButton
      onPress={() => navigate('CharacterSearch', {isOne: !!isOne})}
      alignItems="flex-start"
      pl={16}
      h={48}
      borderWidth={3}
      borderColor={_.isEmpty(text) ? colors.gray[40] : colors.positive[-10]}
      borderRadius={14}>
      <CustomText fontSize={14} color={colors.gray[_.isEmpty(text) ? 40 : 80]}>
        {_.isEmpty(text)
          ? placeHolder
          : isOne
          ? text[0]?.name
          : text.map(item => item.name).join(' ')}
      </CustomText>
    </CenterButton>
  );
}

export default CharacterPageMoveButton;
