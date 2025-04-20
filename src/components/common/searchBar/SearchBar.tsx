import React from 'react';
import HStack from '../view/HStack';
import FormInput from '../input/FormInput';
import IconSearch24 from '~/assets/icons/IconSearch24.svg';
import Center from '../view/Center';

interface Props {
  searchText: string;
  onChangeText: (text: string) => void;
}

/**
 *@description 검색 기능 & 공용 컴포넌트
 */
function SearchBar({searchText, onChangeText}: Props) {
  return (
    <HStack>
      <FormInput
        placeholder="검색"
        paddingRight={40}
        onChangeText={onChangeText}
        value={searchText}
      />

      <Center w={24} h={24} position="absolute" right={12}>
        <IconSearch24 />
      </Center>
    </HStack>
  );
}

export default SearchBar;
