import React, {useState} from 'react';
import {useGetVoteRanking} from '~/apis/vote/hook';
import CenterButton from '~/components/common/button/CenterButton';
import InnerLayout from '~/components/common/layout/InnerLayout';
import SearchNaviBar from '~/components/common/searchBar/SearchNaviBar';
import RoundTab from '~/components/common/tab/RoundTab';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import DateToggleButton from '~/components/vote/main/DateToggleButton';
import FilterVoteSelectorMenu from '~/components/vote/main/FilterVoteSelectorMenu';
import FixedVoteFilterSelector from '~/components/vote/main/FixedVoteFilterSelector';
import VoteItem from '~/components/vote/main/VoteItem';
import VoteModal from '~/components/vote/main/VoteModal';
import {FixedVoteDateFilter, FixedVoteGenderFilter} from '~/types/api/vote';

function VoteMain() {
  const {data, refetch} = useGetVoteRanking({});
  const [topTab, setTopTab] = useState(1);
  const [dateFilter, setDateFilter] = useState<FixedVoteDateFilter>('daily');

  console.log(data);

  const [isFilterVoteSelectorOpen, setFilterVoteSelectorOpen] = useState(false);
  const [fixedVoteFilter, setFixedVoteFilter] =
    useState<FixedVoteGenderFilter>('total');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCelebrityId, setSelectedCelebrityId] = useState<string>();

  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCelebrityId(_id);
  };

  const onTabChange = (num: number) => {
    setTopTab(num);
  };

  return (
    <WhiteSafeAreaView>
      <InnerLayout>
        <RoundTab
          firstTabName="고정 순위"
          secondTabName="테마 순위"
          onFirstTabPress={() => onTabChange(1)}
          onSecondTabPress={() => onTabChange(2)}
          tabStatus={topTab}
        />

        <HStack px={8} justifyContent="space-between" py={20}>
          <FixedVoteFilterSelector
            fixedVoteFilterState={fixedVoteFilter}
            onPress={() => setFilterVoteSelectorOpen(true)}
          />

          <HStack w="auto">
            <DateToggleButton
              borderTopLeftRadius={12}
              borderBottomLeftRadius={12}
              text={'일간'}
              onPress={() => setDateFilter('daily')}
              isActive={dateFilter === 'daily'}
            />

            <DateToggleButton
              text={'주간'}
              onPress={() => setDateFilter('weekly')}
              isActive={dateFilter === 'weekly'}
            />

            <DateToggleButton
              text={'월간'}
              borderTopRightRadius={12}
              borderBottomRightRadius={12}
              onPress={() => setDateFilter('monthly')}
              isActive={dateFilter === 'monthly'}
            />
          </HStack>
        </HStack>

        <VStack>
          <VoteItem index={0} />
          <VoteItem index={1} />
          <VoteItem index={2} />
          <VoteItem index={3} />
        </VStack>
      </InnerLayout>

      <VoteModal
        refetch={refetch}
        isOpen={isOpen}
        celebrityId={selectedCelebrityId}
        onClose={() => setIsOpen(false)}
      />
      <FilterVoteSelectorMenu
        setState={setFixedVoteFilter}
        state={fixedVoteFilter}
        isOpen={isFilterVoteSelectorOpen}
        onClose={() => setFilterVoteSelectorOpen(false)}
      />
    </WhiteSafeAreaView>
  );
}

export default VoteMain;
