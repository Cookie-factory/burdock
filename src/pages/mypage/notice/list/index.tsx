import dayjs from 'dayjs';
import React from 'react';
import {Pressable} from 'react-native';
import {useGetNoticeList} from '~/apis/notice/hook';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import useNavigate from '~/hooks/navigator/useNavigation';

/**
 *@description 공지사항 페이지
 */
function NoticeList() {
  const {data} = useGetNoticeList({});
  const navigate = useNavigate();

  const onMoveNoticeContent = (id: string) => {
    navigate.navigate('NoticeContent', {id});
  };
  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text mb={20}>공지사항 목록</Text>

        <VStack borderWidth={1} py={12}>
          {data?.data.map(_item => (
            <Pressable
              key={_item.id}
              onPress={() => onMoveNoticeContent(_item.id)}>
              <HStack justifyContent="space-between">
                <Text>{_item.title ?? ''}</Text>

                <Text>{dayjs(_item.updatedAt).format('YYYY.MM.DD')}</Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default NoticeList;
