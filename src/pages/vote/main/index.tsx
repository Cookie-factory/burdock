import React from 'react';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';

function VoteMain() {
  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text>메인</Text>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default VoteMain;
