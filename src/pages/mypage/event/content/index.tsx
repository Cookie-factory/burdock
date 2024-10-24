import React from 'react';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';

function EventContent() {
  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text mb={20}>이벤트 컨텐츠</Text>

        <VStack borderWidth={1} py={12}></VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default EventContent;
