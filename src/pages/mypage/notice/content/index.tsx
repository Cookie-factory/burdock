import dayjs from 'dayjs';
import React from 'react';
import {useGetNotice} from '~/apis/notice/hook';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useParam from '~/hooks/navigator/useParam';

/**
 *@description 공지사항 내용 페이지
 */
function NoticeContent() {
  const param = useParam('NoticeContent');
  const {data} = useGetNotice(param?.id ?? '');

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text mb={20}>공지사항 컨텐츠</Text>

        <VStack borderWidth={1} py={12}>
          <HStack mb={24}>
            <Text>{data?.data.title ?? ''}</Text>
          </HStack>

          <HStack justifyContent="flex-end" mb={40}>
            <Text>{dayjs(data?.data.createdAt).format('YYYYMMDD')}</Text>
          </HStack>

          <HStack>
            <Text>{data?.data.content ?? ''}</Text>
          </HStack>
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default NoticeContent;
