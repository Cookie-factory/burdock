import React, {useState} from 'react';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import ToggleTab from '~/components/common/tab/ToggleTab';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import BoardItem from '~/components/community/board/BoardItem';
import {BoardItem as BoardItemType} from '~/types/api/board';
import {useGetBoardList} from '~/apis/board/hook';
import {useGetVoteMyHistory} from '~/apis/vote/hook';
import MyVoteHistoryItem from './MyVoteHistoryItem';

function MyInfoListView() {
  const [isFirstTabActive, setFirstTabActive] = useState(true);
  const {data: getVoteHistoryData} = useGetVoteMyHistory({
    cursor: null,
    take: 20,
  });

  const getVoteHistoryDataList = getVoteHistoryData
    ? getVoteHistoryData?.pages.flatMap(item => {
        return item.data;
      })
    : [];

  console.log('@ getVoteHistoryDataList');
  console.log(getVoteHistoryDataList[0].candidate);

  const {
    refetch,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    // isFetching,
    // isLoading,
  } = useGetBoardList({
    cursor: null,
    take: 20,
  });

  const boardList = data
    ? data?.pages.flatMap(item => {
        return item.data;
      })
    : [];

  const onExpandList = () => {
    //
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onExpandList2 = () => {
    //
  };

  return (
    <VStack flex={1}>
      <HStack>
        <ToggleTab
          name={'게시글'}
          onPress={() => setFirstTabActive(true)}
          isActive={isFirstTabActive}
        />

        <ToggleTab
          name={'투표한 투표'}
          onPress={() => setFirstTabActive(false)}
          isActive={!isFirstTabActive}
        />
      </HStack>

      {isFirstTabActive ? (
        <KeyboardAwareFlatList
          style={{flex: 1, width: '100%'}}
          showsVerticalScrollIndicator={false}
          data={boardList ?? []}
          bounces={false}
          onEndReached={onExpandList2}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            const _item = item as BoardItemType;
            return <BoardItem data={_item} />;
          }}
        />
      ) : (
        <KeyboardAwareFlatList
          style={{flex: 1, width: '100%'}}
          showsVerticalScrollIndicator={false}
          data={getVoteHistoryDataList ?? []}
          bounces={false}
          onEndReached={onExpandList}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return <MyVoteHistoryItem data={item} />;
          }}
        />
      )}
    </VStack>
  );
}

export default MyInfoListView;
