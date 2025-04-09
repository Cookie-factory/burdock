import React, {useState} from 'react';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import ToggleTab from '~/components/common/tab/ToggleTab';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import BoardItem from '~/components/community/board/BoardItem';
import {BoardItem as BoardItemType} from '~/types/api/board';
import {useGetBoardList} from '~/apis/board/hook';
import RankItem from '~/components/common/rank/RankItem';

function MyInfoListView() {
  const [isFirstTabActive, setFirstTabActive] = useState(true);

  const dummyData = [
    {
      uri: 'https://www.cartonionline.com/gif/CARTOON/naruto/Naruto12.jpg',
      name: '나루토',
      count: 90320,
    },
    {
      uri: 'https://i.namu.wiki/i/1ZU6ylY7LT04D-T15ivAiKXEWpITr9n0AaszzmrmKj6PXqT8J_FYo7TyYjXznjNS7s1bPuGnG4-9iNKIXklSOPTxgMs8nrJygWSohOtxn93qHz5G4d5PNR1BOy3-R-0VRwxh_0gpscB3AXwndb5rTQ.webp',
      name: '루피',
      count: 50320,
    },
    {
      uri: 'https://i.namu.wiki/i/l8xijflo9C2oo-Pu63SU9ReUAUXBjc0t1f9fSC-HAImRrVhhECdYa2lzyUwPMmS8yaa7YDPJp6KbO5yww_DfVsCTqEp_Q8rsdXcygw_iat2iD9bgqIQ2wfC4xGFSdkJVzcDST3qT1ef5zrrCDGT1qg.webp',
      name: '쵸파',
      count: 50320,
    },
  ];

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

  if (data) {
    console.log('@ DATA');
    console.log(boardList);
  }

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
          data={dummyData ?? []}
          bounces={false}
          onEndReached={onExpandList}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return <RankItem {...item} rank={index + 1} />;
          }}
        />
      )}
    </VStack>
  );
}

export default MyInfoListView;
