import React from 'react';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';

function MypageMain() {
  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text>마이페이지</Text>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default MypageMain;
