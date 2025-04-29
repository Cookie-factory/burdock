import React, {useState} from 'react';
import VStack from '~/components/common/view/VStack';
import FixedVoteFilterSelector from './FixedVoteFilterSelector';
import DateToggleButton from './DateToggleButton';
import HStack from '~/components/common/view/HStack';
import VoteItem from './VoteItem';
import {useGetVoteRanking} from '~/apis/vote/hook';
import {FixedVoteDateFilter, FixedVoteGenderFilter} from '~/types/api/vote';
import VoteModal from './VoteModal';
import FilterVoteSelectorMenu from './FilterVoteSelectorMenu';
import {colors} from '~/constants/style';
import {APP_HEIGHT} from '~/utils/dimension';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import IconRight16 from '~/assets/icons/IconRight16.svg';
import useNavigate from '~/hooks/navigator/useNavigation';
import _ from 'lodash';

/**
 *@description 고정 일간/주간/월간 순위 뷰
 */
function FixedRankingSection() {
  const {navigate} = useNavigate();

  const [dateFilter, setDateFilter] = useState<FixedVoteDateFilter>('day');
  const [isFilterVoteSelectorOpen, setFilterVoteSelectorOpen] = useState(false);
  const [fixedVoteFilter, setFixedVoteFilter] =
    useState<FixedVoteGenderFilter>('total');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>();

  const {data: rankList, refetch} = useGetVoteRanking({
    voteSubjectTitle: '일간',
    take: 10,
    date: dateFilter,
  });

  const ranks = rankList ? rankList?.pages : [];

  const voteSubjectId = _.isEmpty(ranks) ? '' : ranks[0].voteSubjectId;

  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCandidateId(_id);
  };

  const onMoveRankingPage = () => {
    if (_.isEmpty(voteSubjectId)) return;

    navigate('VoteRankingList', {voteSubjectId});
  };

  return (
    <VStack
      alignItems="flex-start"
      bgColor={colors.gray[0]}
      p={20}
      borderRadius={12}
      borderWidth={1}
      borderColor={colors.gray[30]}
      minHeight={APP_HEIGHT - 280}>
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
            onPress={() => setDateFilter('day')}
            isActive={dateFilter === 'day'}
          />

          <DateToggleButton
            text={'주간'}
            onPress={() => setDateFilter('week')}
            isActive={dateFilter === 'week'}
          />

          <DateToggleButton
            text={'월간'}
            borderTopRightRadius={12}
            borderBottomRightRadius={12}
            onPress={() => setDateFilter('month')}
            isActive={dateFilter === 'month'}
          />
        </HStack>
      </HStack>

      <CenterButton
        w="auto"
        flexDirection="row"
        my={12}
        h={32}
        onPress={onMoveRankingPage}>
        <CustomText fontSize={14} fontWeight={'bold'} mr={4}>
          투표 하러가기
        </CustomText>

        <IconRight16 />
      </CenterButton>

      <VStack>
        {ranks.map(item => (
          <React.Fragment key={item.id}>
            <VoteItem onVoteModalOpen={onVoteModalOpen} data={item} />
          </React.Fragment>
        ))}
      </VStack>

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
    </VStack>
  );
}

export default FixedRankingSection;
