import React from 'react';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import MenuItem from '~/components/mypage/main/MenuItem';

function MypageMain() {
  const tmp = [
    {
      name: 'test1',
      url: 'Inquiry',
    },
    {
      name: 'test2',
      url: 'Inquiry',
    },
    {
      name: 'test3',
      url: 'Inquiry',
    },
  ];
  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text>마이페이지</Text>

        <VStack>
          {tmp.map(item => (
            <MenuItem key={item.name} name={item.name} url={item.url} />
          ))}
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default MypageMain;
