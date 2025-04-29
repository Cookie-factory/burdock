import React from 'react';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';
import VStack from '../common/view/VStack';
import RankItem from '../common/rank/RankItem';
import MoreView from '../common/view/MoreView';
import _ from 'lodash';
import {RankVoteItem} from '~/types/api/vote';

interface Props {
  voteSubjectId: string;
  ranks: RankVoteItem[];
  onVoteModalOpen: (id: string) => void;
  subjectTotalVotes?: number;
}

/**
 *@description 메인 페이지 > 금일 랭킹 구역
 */
function MainTodayVoteRankView({
  voteSubjectId,
  ranks,
  onVoteModalOpen,
  subjectTotalVotes,
}: Props) {
  const {navigate} = useNavigate();

  const onMoveRankingPage = () => {
    navigate('VoteRankingList', {
      voteSubjectId,
    });
  };

  return (
    <VStack bgColor={colors.gray[0]}>
      <MoreView text="오늘의 최고 캐릭터" onPress={onMoveRankingPage} />

      <VStack>
        {ranks.map(item => (
          <React.Fragment key={item.id}>
            <RankItem
              data={item}
              onVoteModalOpen={onVoteModalOpen}
              subjectTotalVotes={subjectTotalVotes}
            />
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
}

export default MainTodayVoteRankView;
