import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {useGetCharacterList} from '~/apis/character/hook';
import CharacterItem from '~/components/character/CharacterItem';
import ActiveButton from '~/components/common/button/ActiveButton';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import SearchBar from '~/components/common/searchBar/SearchBar';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useNavigate from '~/hooks/navigator/useNavigation';
import {useAppDispatch, useAppSelector} from '~/hooks/redux';
import {
  addSelectedCharacter,
  removeSelectedCharacter,
} from '~/store/slices/characterSlice';
import {
  CharacterItem as CharacterItemType,
  SelectedCharactersData,
} from '~/types/api/character';

/**
 *@description 캐릭터 검색 페이지
 */
function CharacterSearch() {
  const {goBack} = useNavigate();
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    state => state.counter.selectedCharacters,
  );
  const [searchText, setSearchText] = useState('');
  const {data} = useGetCharacterList({
    search: searchText,
  });
  const [searchList, setSearchList] = useState<CharacterItemType[]>([]);

  const onSelectCharacter = (_data: SelectedCharactersData) => {
    if (selectedCharacters.length < 3) {
      if (checkContainCharacter(_data.id)) {
        dispatch(removeSelectedCharacter(_data));
      } else {
        dispatch(addSelectedCharacter(_data));
      }
    } else {
      if (checkContainCharacter(_data.id)) {
        dispatch(removeSelectedCharacter(_data));
      }
    }
  };

  const checkContainCharacter = (id: string) => {
    //
    return selectedCharacters.some(item => item.id === id);
  };

  useEffect(() => {
    if (data?.pages) {
      setSearchList((data?.pages ?? []).flatMap(item => item.data));
    }
  }, [data?.pages]);

  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <SearchBar searchText={searchText} onChangeText={setSearchText} />

        <ScrollView>
          <VStack flex={1} pt={20}>
            {(searchList ?? []).map(item => (
              <React.Fragment key={item.id}>
                <CharacterItem
                  onPress={onSelectCharacter}
                  isActive={checkContainCharacter(item.id)}
                  {...item}
                  source={item.characterSource.name}
                />
              </React.Fragment>
            ))}
          </VStack>
        </ScrollView>

        <ActiveButton mt={26} onPress={goBack} buttonType="blue" text="추가" />
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default CharacterSearch;
