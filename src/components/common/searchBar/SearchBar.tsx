import React from 'react';
import HStack from '../view/HStack';
import CustomInput from '../input/Input';
import CustomText from '../text/Text';
import {useGetCelebrityList} from '~/apis/celebrity/hook';
import CenterButton from '../button/CenterButton';
import {APP_WIDTH} from '~/utils/dimension';

interface Props {
  searchText: string;
  onChangeText: (text: string) => void;
}

/**
 *@description 검색 기능 & 공용 컴포넌트
 */
function SearchBar({searchText, onChangeText}: Props) {
  return (
    <HStack borderWidth={1}>
      <HStack flex={1}>
        <CustomInput value={searchText} onChangeText={onChangeText} />
      </HStack>

      <CenterButton w={54} h={34} borderWidth={1}>
        <CustomText>검색</CustomText>
      </CenterButton>
    </HStack>
  );
}

export default SearchBar;
