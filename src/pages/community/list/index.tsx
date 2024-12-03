import React from 'react';
import {useGetBoardList} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {BoardItem as BoardItemType} from '~/types/api/board';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';
import BoardItem from '~/components/community/board/BoardItem';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import InnerLayout from '~/components/common/layout/InnerLayout';
import HStack from '~/components/common/view/HStack';

function CommunityList() {
  const {navigate} = useNavigate();
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
  // const isContentLoading = isFetching || isLoading || isInitialLoading;

  const onExpandList = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useFocusScreen(() => {
    refetch();
  });

  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <HStack mb={18} px={12} justifyContent="flex-end">
          <CenterButton
            w={74}
            borderBottomWidth={1}
            h={44}
            onPress={() => navigate('CommunityRegister')}>
            <Text>글 추가</Text>
          </CenterButton>
        </HStack>

        <KeyboardAwareFlatList
          style={{flex: 1, width: '100%'}}
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
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default CommunityList;
