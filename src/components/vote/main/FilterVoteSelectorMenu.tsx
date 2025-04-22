import React, {useState} from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomActionSheet from '~/components/common/modal/CustomActionSheet';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import {FixedVoteGenderFilter} from '~/types/api/vote';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setState: (state: FixedVoteGenderFilter) => void;
  state: FixedVoteGenderFilter;
}

/**
 *@description 투표 페이지 고정 순위 필터 셀랙터 메뉴
 */
function FilterVoteSelectorMenu({isOpen, onClose, setState, state}: Props) {
  const onSelect = (_state: FixedVoteGenderFilter) => {
    setState(_state);
    onClose();
  };
  return (
    <CustomActionSheet isOpen={isOpen} onClose={onClose}>
      <VStack
        px={20}
        pb={40}
        bgColor={colors.gray[0]}
        position="absolute"
        bottom={0}>
        <CenterButton
          h={48}
          onPress={() => onSelect('total')}
          borderBottomWidth={1}
          borderColor={colors.gray[40]}>
          <CustomText
            fontWeight={state === 'total' ? 'bold' : '500'}
            color={state === 'total' ? colors.positive[0] : colors.gray[60]}>
            {'종합 캐릭터 순위'}
          </CustomText>
        </CenterButton>

        <CenterButton
          h={48}
          onPress={() => onSelect('woman')}
          borderBottomWidth={1}
          borderColor={colors.gray[40]}>
          <CustomText
            fontWeight={state === 'total' ? 'bold' : '500'}
            color={state === 'woman' ? colors.positive[0] : colors.gray[60]}>
            {'여성 캐릭터 순위'}
          </CustomText>
        </CenterButton>

        <CenterButton
          h={48}
          onPress={() => onSelect('man')}
          borderBottomWidth={1}
          borderColor={colors.gray[40]}>
          <CustomText
            fontWeight={state === 'total' ? 'bold' : '500'}
            color={state === 'man' ? colors.positive[0] : colors.gray[60]}>
            {'남성 캐릭터 순위'}
          </CustomText>
        </CenterButton>

        <CenterButton
          h={48}
          onPress={() => onSelect('nogender')}
          borderBottomWidth={1}
          borderColor={colors.gray[40]}>
          <CustomText
            fontWeight={state === 'total' ? 'bold' : '500'}
            color={state === 'nogender' ? colors.positive[0] : colors.gray[60]}>
            {'무성 캐릭터 순위'}
          </CustomText>
        </CenterButton>
      </VStack>
    </CustomActionSheet>
  );
}

export default FilterVoteSelectorMenu;
