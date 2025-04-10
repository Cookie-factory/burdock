import React, {useState} from 'react';
import InnerLayout from '~/components/common/layout/InnerLayout';
import SearchBar from '~/components/common/searchBar/SearchBar';
import ToggleTab from '~/components/common/tab/ToggleTab';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import FollowItem from '~/components/mypage/main/FollowItem';

/**
 *@description 팔로우, 팔로잉, 구독 리스트 확인 페이지
 */
function FollowPage() {
  const [tabActive, setTabActive] = useState(0);

  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <HStack mb={14}>
          <ToggleTab
            name={'팔로워 40명'}
            onPress={() => setTabActive(0)}
            isActive={tabActive === 0}
          />

          <ToggleTab
            name={'팔로잉 40명'}
            onPress={() => setTabActive(1)}
            isActive={tabActive === 1}
          />

          <ToggleTab
            name={'구독 12명'}
            onPress={() => setTabActive(2)}
            isActive={tabActive === 2}
          />
        </HStack>

        <SearchBar
          searchText={''}
          onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          }}
        />

        <VStack mt={28}>
          <FollowItem />
          <FollowItem />
          <FollowItem />
        </VStack>
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default FollowPage;
