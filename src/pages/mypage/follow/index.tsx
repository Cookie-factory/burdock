import React, {useState} from 'react';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useGetFollowerList, useGetFollowingList} from '~/apis/follow/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import SearchBar from '~/components/common/searchBar/SearchBar';
import ToggleTab from '~/components/common/tab/ToggleTab';
import HStack from '~/components/common/view/HStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import FollowItem from '~/components/mypage/main/FollowItem';
import useParam from '~/hooks/navigator/useParam';

/**
 *@description 팔로우, 팔로잉, 구독 리스트 확인 페이지
 */
function FollowPage() {
  const [tabActive, setTabActive] = useState(0);
  const [search, setSearch] = useState('');
  const param = useParam('FollowPage');
  const getFollowerList = useGetFollowerList({
    targetUserId: param?.targetUserId ?? '',
    search,
  });

  const getFollowingList = useGetFollowingList({
    targetUserId: param?.targetUserId ?? '',
  });

  const onExpandList = () => {
    if (tabActive === 0) {
      getFollowerList.refetch();
      if (getFollowerList.hasNextPage && !getFollowerList.isFetchingNextPage) {
        getFollowerList.fetchNextPage();
      }
    } else {
      if (
        getFollowingList.hasNextPage &&
        !getFollowingList.isFetchingNextPage
      ) {
        getFollowingList.fetchNextPage();
      }
    }
  };

  const onFollowListRefetch = () => {
    if (tabActive === 0) {
      getFollowerList.refetch();
    } else {
      getFollowingList.refetch();
    }
  };

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
        </HStack>

        <SearchBar searchText={search} onChangeText={setSearch} />

        <KeyboardAwareFlatList
          style={{
            marginTop: 14,
            flex: 1,
            width: '100%',
            // marginBottom: uiStyle.tab.height + 20,
          }}
          showsVerticalScrollIndicator={false}
          data={
            tabActive === 0
              ? getFollowerList.data?.pages ?? []
              : getFollowingList.data?.pages ?? []
          }
          bounces={false}
          onEndReached={onExpandList}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <FollowItem data={item} refetch={onFollowListRefetch} />
          )}
        />
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default FollowPage;
