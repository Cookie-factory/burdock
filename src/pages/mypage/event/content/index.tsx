import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useGetNotice} from '~/apis/notice/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {colors} from '~/constants/style';
import useParam from '~/hooks/navigator/useParam';
import getTimeFromNow from '~/utils/time';

/**
 *@description 이벤트 내용 페이지
 */
function EventContent() {
  const param = useParam('EventContent');
  const {data} = useGetNotice(param?.id ?? '');

  return (
    <WhiteSafeAreaView>
      <ScrollView bounces={false}>
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
      </ScrollView>
    </WhiteSafeAreaView>
  );
}

export default EventContent;
