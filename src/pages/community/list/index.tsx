import React, {useState} from 'react';
import {useGetBoardList} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {BoardItem as BoardItemType} from '~/types/api/board';
import BoardItem from '~/components/community/board/BoardItem';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import InnerLayout from '~/components/common/layout/InnerLayout';
import TabList from '~/components/community/list/TabList';
import {CommunityListTabFilter} from '~/types/api/community';
import FilterSelector from '~/components/community/list/FilterSelector';
import CustomSelectorActionSheet from '~/components/common/selector/SelectorModal';
import RegisterButton from '~/components/community/list/RegisterButton';

function CommunityList() {
  const {navigate} = useNavigate();
  const [communityListTab, setCommunityTab] =
    useState<CommunityListTabFilter>('total');

  const [isFilterSelectorOpen, setFilterSelectorOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    text: '차애',
    value: '1',
  });

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
    console.log('@ DATA');
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
        <TabList onSelect={setCommunityTab} value={communityListTab} />

        <FilterSelector setFilterSelectorOpen={setFilterSelectorOpen} />

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

      <RegisterButton onPress={() => navigate('CommunityRegister')} />

      <CustomSelectorActionSheet
        isOpen={isFilterSelectorOpen}
        onClose={() => setFilterSelectorOpen(false)}
        list={[
          {
            value: '1',
            text: '차애',
          },
        ]}
        selectedItem={selectedFilter}
        onSelect={setSelectedFilter}
        height={120}
      />
    </WhiteSafeAreaView>
  );
}

export default CommunityList;
