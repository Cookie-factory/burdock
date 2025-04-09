import React from 'react';
import InnerLayout from '~/components/common/layout/InnerLayout';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import MenuItem from '~/components/mypage/main/MenuItem';
import {colors} from '~/constants/style';

/**
 *@description 메뉴 페이지
 */
function MenuMain() {
  const tmp = [
    {
      name: '공지사항',
      url: 'NoticeList',
    },
    {
      name: '이벤트',
      url: 'EventList',
    },
    {
      name: '상점',
      url: 'EventList',
    },
    {
      name: '문의하기',
      url: 'Inquiry',
    },
    {
      name: '투표 이력',
      url: 'Inquiry',
    },

    {
      name: '설정',
      url: 'Setting',
    },
  ];

  return (
    <WhiteSafeAreaView>
      <InnerLayout bgColor={colors.gray[0]}>
        <VStack py={4}>
          {tmp.map(item => (
            <MenuItem key={item.name} name={item.name} url={item.url} />
          ))}
        </VStack>
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default MenuMain;
