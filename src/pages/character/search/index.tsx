import React from 'react';
import CharacterItem from '~/components/character/CharacterItem';
import ActiveButton from '~/components/common/button/ActiveButton';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import SearchBar from '~/components/common/searchBar/SearchBar';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';

interface Props {}

/**
 *@description 캐릭터 검색 페이지
 */
function CharacterSearch() {
  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <SearchBar
          searchText={'캐릭터나 만화명을 입력해주세요.'}
          onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          }}
        />

        <ScrollView>
          <VStack flex={1} pt={20}>
            <CharacterItem
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }}
              isActive={true}
            />
          </VStack>
        </ScrollView>

        <ActiveButton
          mt={26}
          onPress={() => {}}
          buttonType="blue"
          text="추가"
        />
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default CharacterSearch;
