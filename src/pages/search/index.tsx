import React, {useEffect, useState} from 'react';
import {useGetCharacterList} from '~/apis/character/hook';
import CenterButton from '~/components/common/button/CenterButton';
import SearchBar from '~/components/common/searchBar/SearchBar';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {CharacterItem} from '~/types/api/character';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const {data} = useGetCharacterList({
    search: searchText,
  });
  const [searchList, setSearchList] = useState<CharacterItem[]>([]);

  useEffect(() => {
    if (data?.pages) {
      setSearchList((data?.pages ?? []).flatMap(item => item.data));
    }
  }, [data?.pages]);

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <SearchBar searchText={searchText} onChangeText={setSearchText} />

        <VStack>
          {(searchList ?? []).map(item => (
            <CenterButton
              onPress={() => {}}
              key={item.id}
              py={20}
              mb={4}
              flexDirection="row"
              justifyContent="space-between">
              <Text>{item.name}</Text>
              <Text>{item.characterSource.name}</Text>
            </CenterButton>
          ))}
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default SearchPage;
