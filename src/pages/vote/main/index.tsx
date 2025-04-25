import React, {useState} from 'react';
import {useGetVoteRanking, usePostDailyVote} from '~/apis/vote/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import RoundTab from '~/components/common/tab/RoundTab';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import DateToggleButton from '~/components/vote/main/DateToggleButton';
import FilterVoteSelectorMenu from '~/components/vote/main/FilterVoteSelectorMenu';
import FixedVoteFilterSelector from '~/components/vote/main/FixedVoteFilterSelector';
import VoteItem from '~/components/vote/main/VoteItem';
import VoteModal from '~/components/vote/main/VoteModal';
import {FixedVoteDateFilter, FixedVoteGenderFilter} from '~/types/api/vote';

/**
 *@description 투표 메인 페이지
 */
function VoteMain() {
  const [dateFilter, setDateFilter] = useState<FixedVoteDateFilter>('일간');
  const [isFilterVoteSelectorOpen, setFilterVoteSelectorOpen] = useState(false);
  const [fixedVoteFilter, setFixedVoteFilter] =
    useState<FixedVoteGenderFilter>('total');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>();
  const [topTab, setTopTab] = useState(1);

  const {data, refetch} = useGetVoteRanking({
    voteSubjectTitle: dateFilter,
    take: 10,
  });

  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCandidateId(_id);
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
              onPress={() => setDateFilter('일간')}
              isActive={dateFilter === '일간'}
            />

            <DateToggleButton
              text={'주간'}
              onPress={() => setDateFilter('주간')}
              isActive={dateFilter === '주간'}
            />

            <DateToggleButton
              text={'월간'}
              borderTopRightRadius={12}
              borderBottomRightRadius={12}
              onPress={() => setDateFilter('월간')}
              isActive={dateFilter === '월간'}
            />
          </HStack>
        </HStack>

        <VStack>
          {data?.data.map(item => (
            <React.Fragment key={item.id}>
              <VoteItem onVoteModalOpen={onVoteModalOpen} data={item} />
            </React.Fragment>
          ))}
        </VStack>
      </InnerLayout>

      <VoteModal
        type="DAILY_VOTE"
        refetch={refetch}
        candidateId={selectedCandidateId}
        isOpen={isOpen}
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
