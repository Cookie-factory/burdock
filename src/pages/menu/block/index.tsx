import React, {useState} from 'react';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useGetBlockedUserList} from '~/apis/block/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import BlockedItem from '~/components/menu/block/BlockedItem';

/**
 *@description 내가 차단한 유저들 리스트 페이지
 */
function BlockedUserPage() {
  const {refetch, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useGetBlockedUserList({cursor: null, take: 20});

  const blockedUserList = data
    ? data?.pages.flatMap(item => {
        return item.data;
      })
    : [];

  const onExpandList = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <KeyboardAwareFlatList
          style={{
            flex: 1,
            width: '100%',
            //   marginBottom: uiStyle.tab.height + 20,
          }}
          showsVerticalScrollIndicator={false}
          data={blockedUserList ?? []}
          bounces={false}
          onEndReached={onExpandList}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return <BlockedItem data={item} refetch={refetch} />;
          }}
        />
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default BlockedUserPage;
