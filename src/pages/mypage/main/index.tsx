import React from 'react';
import {useGetAuthInfo} from '~/apis/auth/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
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
