import React from 'react';
import {Icon} from 'react-native-paper';
import {useGetAuthInfo} from '~/apis/auth/hook';
import CenterButton from '~/components/common/button/CenterButton';
import InnerLayout from '~/components/common/layout/InnerLayout';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import MenuItem from '~/components/mypage/main/MenuItem';
import {colors} from '~/constants/style';

function MypageMain() {
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
      name: '1:1 문의',
      url: 'Inquiry',
    },
    {
      name: '설정',
      url: 'Setting',
    },
  ];

  const {data: getAuthInfoData} = useGetAuthInfo();

  return (
    <WhiteSafeAreaView bgColor={colors.blue[30]}>
      <CenterButton pt={34} pb={54} px={18}>
        <HStack>
          <Icon source="account-circle-outline" size={50} />

          <VStack ml={16} flex={1} alignItems="flex-start">
            <CustomText fontWeight={'bold'} fontSize={16} mb={6}>
              {getAuthInfoData?.data.nickname ?? ''}
            </CustomText>

            <CustomText fontSize={12}>내정보 수정하기</CustomText>
          </VStack>
        </HStack>
      </CenterButton>

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

export default MypageMain;
