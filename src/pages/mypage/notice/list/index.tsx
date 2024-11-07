import dayjs from 'dayjs';
import React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-paper';
import {useGetNoticeList} from '~/apis/notice/hook';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';

/**
 *@description 공지사항 페이지
 */
function NoticeList() {
  const {data} = useGetNoticeList({type: 'NOTICE'});
  const navigate = useNavigate();

  const onMoveContent = (id: string) => {
    navigate.navigate('NoticeContent', {id});
  };

  return (
    <WhiteSafeAreaView>
      <VStack>
        {data?.data.map(_item => (
          <Pressable key={_item.id} onPress={() => onMoveContent(_item.id)}>
            <HStack
              py={16}
              px={20}
              justifyContent="space-between"
              borderBottomWidth={1}
              borderBottomColor={colors.gray[30]}>
              <VStack flex={1} alignItems="flex-start">
                <Text fontSize={16} fontWeight={'bold'} mb={4}>
                  {_item.title ?? ''}
                </Text>

                <Text fontSize={12}>
                  {dayjs(_item.updatedAt).format('YYYY.MM.DD')}
                </Text>
              </VStack>

              <Icon source={'chevron-right'} size={32} />
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default NoticeList;
