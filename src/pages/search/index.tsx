import React, {useEffect, useState} from 'react';
import {useGetCelebrityList} from '~/apis/celebrity/hook';
import CenterButton from '~/components/common/button/CenterButton';
import SearchBar from '~/components/common/searchBar/SearchBar';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {CelebrityItem} from '~/types/api/celebrity';

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const {data} = useGetCelebrityList({
    search: searchText,
    category: 'YOUTUBE',
  });
  const [searchList, setSearchList] = useState<CelebrityItem[]>([]);

  useEffect(() => {
    if (data?.pages) {
      setSearchList((data?.pages ?? []).flatMap(item => item.data));
    }
  }, [data?.pages]);

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <VStack pb={30}>
          <Text>메인</Text>
        </VStack>

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
              <Text>{item.category}</Text>
            </CenterButton>
          ))}
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default SearchPage;
