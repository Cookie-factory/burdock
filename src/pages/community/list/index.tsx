import React from 'react';
import {useGetBoardList} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import VStack from '~/components/common/view/VStack';
import {BoardItem as BoardItemType} from '~/types/api/board';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import BoardItem from '~/components/community/board/BoardItem';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';

function CommunityList() {
  const {navigate} = useNavigate();
  const {
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
  // const isContentLoading = isFetching || isLoading || isInitialLoading;

  const onExpandList = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20} borderWidth={10} borderColor={'blue'}>
        <CenterButton
          h={44}
          mb={18}
          onPress={() => navigate('CommunityRegister')}>
          <Text>추가</Text>
        </CenterButton>

        <KeyboardAwareFlatList
          showsVerticalScrollIndicator={false}
          data={boardList ?? []}
          bounces={false}
          onEndReached={onExpandList}
          onEndReachedThreshold={0.5}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            const _item = item as BoardItemType;
            return <BoardItem data={_item} />;
          }}
        />
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default CommunityList;
