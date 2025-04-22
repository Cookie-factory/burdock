import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import IconDown11 from '~/assets/icons/IconDown11.svg';
import HStack from '~/components/common/view/HStack';
import {FixedVoteGenderFilter} from '~/types/api/vote';

interface Props {
  onPress: () => void;
  fixedVoteFilterState: FixedVoteGenderFilter;
}

/**
 *@description 투표 페이지 고정 순위 필터 셀렉터
 */
function FixedVoteFilterSelector({onPress, fixedVoteFilterState}: Props) {
  const textObj = {
    total: '전체 캐릭터',
    woman: '여성 캐릭터',
    man: '남성 캐릭터',
    nogender: '무성 캐릭터',
  };

  return (
    <CenterButton w="auto" onPress={onPress}>
      <HStack w="auto" gap={10}>
        <CustomText>{textObj[fixedVoteFilterState]}</CustomText>

        <IconDown11 />
      </HStack>
    </CenterButton>
  );
}

export default FixedVoteFilterSelector;
