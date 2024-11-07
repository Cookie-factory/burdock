import dayjs from 'dayjs';
import React from 'react';
import {useGetNotice} from '~/apis/notice/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {colors} from '~/constants/style';
import useParam from '~/hooks/navigator/useParam';

/**
 *@description 공지사항 내용 페이지
 */
function NoticeContent() {
  const param = useParam('NoticeContent');
  const {data} = useGetNotice(param?.id ?? '');

  return (
    <WhiteSafeAreaView>
      <HStack
        py={16}
        px={20}
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor={colors.gray[30]}>
        <VStack flex={1} alignItems="flex-start">
          <Text fontSize={16} fontWeight={'bold'} mb={4}>
            {data?.data.title ?? ''}
          </Text>

          <Text fontSize={12}>
            {dayjs(data?.data.createdAt).format('YYYY.MM.DD')}
          </Text>
        </VStack>
      </HStack>

      <InnerLayout pt={42} alignItems="flex-start">
        <Text fontSize={14}>{data?.data.content}</Text>
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default NoticeContent;
