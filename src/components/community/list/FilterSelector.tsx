import React, {useState} from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import {colors} from '~/constants/style';
import IconRight16 from '~/assets/icons/IconRight16.svg';

interface Props {
  setFilterSelectorOpen: (isOpen: boolean) => void;
}

/**
 *@description 커뮤니티 캐릭터 필터 선택 컴포넌트
 */
function FilterSelector({setFilterSelectorOpen}: Props) {
  return (
    <CenterButton
      onPress={() => setFilterSelectorOpen(true)}
      flexDirection="row"
      borderWidth={1}
      borderColor={colors.gray[40]}
      h={35}
      px={18}
      mb={18}
      justifyContent="space-between">
      <HStack w="auto" justifyContent="flex-start">
        <CustomText color={colors.gray[80]} marginRight={12}>
          01
        </CustomText>
        <CustomText color={colors.gray[80]}>최애</CustomText>
      </HStack>

      <IconRight16 />
    </CenterButton>
  );
}

export default FilterSelector;
