import React, {useState} from 'react';
import {useGetVoteRanking} from '~/apis/vote/hook';
import Text from '~/components/common/text/Text';
import BinStack from '~/components/common/view/BinStack';
import Center from '~/components/common/view/Center';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import MainCurrentVoteView from '~/components/main/MainCurrentVoteView';
import MainHeader from '~/components/main/MainHeader';
import MainTodayVoteRankView from '~/components/main/MainTodayVoteRankView';
import VoteModal from '~/components/vote/main/VoteModal';

function MainPage() {
  const {data, refetch} = useGetVoteRanking({
    voteSubjectTitle: '일간',
    take: 3,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCelebrityId, setSelectedCelebrityId] = useState<string>();

  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCelebrityId(_id);
  };

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <MainHeader />

        <MainTodayVoteRankView />

        <VStack borderWidth={1} h={72} justifyContent="space-between">
          <BinStack h={20} />

          <Center>
            <Text fontSize={20}>광고</Text>
          </Center>

          <BinStack h={20} />
        </VStack>

        <MainCurrentVoteView />
      </VStack>

      <VoteModal
        type="DAILY_VOTE"
        refetch={refetch}
        isOpen={isOpen}
        candidateId={selectedCelebrityId}
        onClose={() => setIsOpen(false)}
      />
    </WhiteSafeAreaView>
  );
}

export default MainPage;
