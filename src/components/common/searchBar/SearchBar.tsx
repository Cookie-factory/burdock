import React from 'react';
import HStack from '../view/HStack';
import CustomInput from '../input/Input';
import CustomText from '../text/Text';
import {useGetCelebrityList} from '~/apis/celebrity/hook';

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
      <HStack>
        <CustomInput flex={1} value={searchText} onChangeText={onChangeText} />

        <CustomText w={34}>검색</CustomText>
      </HStack>
    </HStack>
  );
}

export default SearchBar;
