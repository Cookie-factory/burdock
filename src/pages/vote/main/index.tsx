import React, {useState} from 'react';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import RoundTab from '~/components/common/tab/RoundTab';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import FixedRankingSection from '~/components/vote/main/FixedRankingSection';
import ThemeListSection from '~/components/vote/main/ThemeListSection';
import {colors} from '~/constants/style';

/**
 *@description 투표 메인 페이지
 */
function VoteMain() {
  const [topTab, setTopTab] = useState(1);

  const onTabChange = (num: number) => {
    setTopTab(num);
  };

  return (
    <WhiteSafeAreaView backgroundColor={colors.gray[10]}>
      <InnerLayout>
        <RoundTab
          firstTabName="고정 순위"
          secondTabName="테마 순위"
          onFirstTabPress={() => onTabChange(1)}
          onSecondTabPress={() => onTabChange(2)}
          tabStatus={topTab}
        />

        <ScrollView>
          {topTab === 2 ? <ThemeListSection /> : <FixedRankingSection />}
        </ScrollView>
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default VoteMain;
