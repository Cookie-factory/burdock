import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useGetBoardList} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import VStack from '~/components/common/view/VStack';
import {BoardItem} from '~/types/api/board';
import CenterButton from '~/components/common/button/CenterButton';
import HStack from '~/components/common/view/HStack';
import dayjs from 'dayjs';

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

  const onMoveContent = (id: string) => {
    navigate('CommunityContent', {id});
  };

  return (
    <View style={{flex: 1, borderWidth: 1}}>
      <Button mode="contained" onPress={() => navigate('CommunityRegister')}>
        추가
      </Button>

      <KeyboardAwareFlatList
        showsVerticalScrollIndicator={false}
        data={boardList ?? []}
        bounces={false}
        onEndReached={onExpandList}
        onEndReachedThreshold={0.5}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          const _item = item as BoardItem;
          return (
            <CenterButton onPress={() => onMoveContent(_item.id)}>
              <VStack
                style={{
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}>
                <Text style={{width: 90, borderWidth: 1, marginBottom: 8}}>
                  {_item.title}
                </Text>

                <HStack
                  style={{
                    width: '100%',
                    justifyContent: 'flex-end',
                    borderWidth: 1,
                  }}>
                  <Text style={{marginRight: 20}}>{_item.author.nickname}</Text>
                  <Text style={{}}>
                    {dayjs(_item.updatedAt).format('YY.MM.DD hh:mm')}
                  </Text>
                </HStack>
              </VStack>
            </CenterButton>
          );
        }}
      />
    </View>
  );
}

export default CommunityList;
