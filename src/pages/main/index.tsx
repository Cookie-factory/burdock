import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {useGetVoteRanking} from '~/apis/vote/hook';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import MainCurrentVoteView from '~/components/main/MainCurrentVoteView';
import MainHeader from '~/components/main/MainHeader';
import MainTodayVoteRankView from '~/components/main/MainTodayVoteRankView';
import VoteModal from '~/components/vote/main/VoteModal';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {Platform} from 'react-native';
import {APP_HEIGHT} from '~/utils/dimension';

function MainPage() {
  const {data: rankList, refetch} = useGetVoteRanking({
    voteSubjectTitle: '일간',
    take: 3,
    date: 'month',
    // date: 'day',
  });
  const bannerRef = useRef<BannerAd>(null);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  const ranks = rankList ? rankList?.pages : [];

  const voteSubjectId = _.isEmpty(ranks) ? '' : ranks[0].voteSubjectId;
  const subjectTotalVotes =
    rankList?.totalVotesOfSubject === 0 ? 1 : rankList?.totalVotesOfSubject;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCelebrityId, setSelectedCelebrityId] = useState<string>();
  const onVoteModalOpen = (_id: string) => {
    setIsOpen(true);
    setSelectedCelebrityId(_id);
  };

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  return (
    <WhiteSafeAreaView>
      <VStack h={APP_HEIGHT - 162}>
        <VStack flex={1} px={20}>
          <MainHeader />

          <VStack>
            <MainTodayVoteRankView
              onVoteModalOpen={onVoteModalOpen}
              voteSubjectId={voteSubjectId}
              ranks={ranks}
              subjectTotalVotes={subjectTotalVotes}
            />

            <MainCurrentVoteView />
          </VStack>
        </VStack>

        <VStack h={54}>
          <BannerAd
            ref={bannerRef}
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
          />
        </VStack>
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
