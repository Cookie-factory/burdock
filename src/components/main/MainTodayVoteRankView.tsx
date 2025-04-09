import React from 'react';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';
import VStack from '../common/view/VStack';
import RankItem from '../common/rank/RankItem';
import MoreView from '../common/view/MoreView';

/**
 *@description 메인 페이지 > 금일 랭킹 구역
 */
function MainTodayVoteRankView() {
  const {navigate} = useNavigate();

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

  return (
    <VStack bgColor={colors.gray[0]}>
      <MoreView text="오늘의 최고 캐릭터" onPress={() => {}} />

      <VStack>
        {dummyData.map((item, i) => (
          <React.Fragment key={i}>
            <RankItem {...item} rank={i + 1} />
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
}

export default MainTodayVoteRankView;
