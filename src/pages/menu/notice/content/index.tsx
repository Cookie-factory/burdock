import React from 'react';
import {useGetNotice} from '~/apis/notice/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {colors, uiStyle} from '~/constants/style';
import useParam from '~/hooks/navigator/useParam';
import {APP_HEIGHT} from '~/utils/dimension';
import getTimeFromNow from '~/utils/time';

/**
 *@description 공지사항 내용 페이지
 */
function NoticeContent() {
  const param = useParam('NoticeContent');
  const {data} = useGetNotice(param?.id ?? '');

  return (
    <WhiteSafeAreaView>
      <ScrollView>
        <VStack
          bgColor={colors.gray[0]}
          minHeight={APP_HEIGHT - uiStyle.header.height}>
          <HStack
            py={20}
            px={20}
            justifyContent="space-between"
            borderBottomWidth={1}
            borderBottomColor={colors.gray[30]}>
            <HStack flex={1} alignItems="center" justifyContent="space-between">
              <Text
                fontSize={16}
                fontWeight={'bold'}
                mb={4}
                color={colors.gray[80]}>
                {data?.data.title ?? ''}
              </Text>

              <Text fontSize={12} color={colors.gray[60]}>
                {getTimeFromNow(data?.data.createdAt)}
              </Text>
            </HStack>
          </HStack>

          <InnerLayout pt={42} alignItems="flex-start">
            <Text fontSize={14} style={{lineHeight: 22}}>
              {data?.data.content}
            </Text>
          </InnerLayout>
        </VStack>
      </ScrollView>
    </WhiteSafeAreaView>
  );
}

export default NoticeContent;
