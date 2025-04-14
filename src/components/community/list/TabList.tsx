import React from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import {colors, uiStyle} from '~/constants/style';
import {CommunityListTabFilter} from '~/types/api/community';

interface Props {
  onSelect: (item: CommunityListTabFilter) => void;
  value: CommunityListTabFilter;
}

/**
 *@description 탭 리스트
 */
function TabList({onSelect, value}: Props) {
  return (
    <HStack h={uiStyle.header.height}>
      <CenterButton h={34} w={56} onPress={() => onSelect('total')}>
        <CustomText
          fontWeight={'bold'}
          color={colors.gray[value === 'total' ? 90 : 60]}>
          전체
        </CustomText>
      </CenterButton>

      <CenterButton h={34} w={56} onPress={() => onSelect('best')}>
        <CustomText
          fontWeight={'bold'}
          color={colors.gray[value === 'best' ? 90 : 60]}>
          베스트
        </CustomText>
      </CenterButton>

      <CenterButton h={34} w={56} onPress={() => onSelect('bookmark')}>
        <CustomText
          fontWeight={'bold'}
          color={colors.gray[value === 'bookmark' ? 90 : 60]}>
          즐겨찾기
        </CustomText>
      </CenterButton>
    </HStack>
  );
}

export default TabList;
