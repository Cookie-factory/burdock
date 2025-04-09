import React from 'react';
import {Icon} from 'react-native-paper';
import {useGetAuthInfo} from '~/apis/auth/hook';
import CenterButton from '~/components/common/button/CenterButton';
import InnerLayout from '~/components/common/layout/InnerLayout';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import MenuItem from '~/components/menu/MenuItem';
import MyInfoListView from '~/components/mypage/main/MyInfoListView';
import MyInfoView from '~/components/mypage/main/MyInfoView';
import {colors, uiStyle} from '~/constants/style';

/**
 *@description 내 계정 페이지
 */
function MypageMain() {
  const {data: getAuthInfoData} = useGetAuthInfo();

  return (
    <WhiteSafeAreaView>
      <InnerLayout
        bgColor={colors.gray[0]}
        pt={32}
        pb={uiStyle.tab.height + 10}>
        {/* // 상단 정보뷰 */}
        <MyInfoView />

        {/* 하단 리스트 뷰 */}
        <MyInfoListView />
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default MypageMain;
