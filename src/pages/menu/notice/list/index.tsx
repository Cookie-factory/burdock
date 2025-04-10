import React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-paper';
import {useGetNoticeList} from '~/apis/notice/hook';
import ScrollView from '~/components/common/scrollView/ScrollView';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import {colors} from '~/constants/style';
import useNavigate from '~/hooks/navigator/useNavigation';
import getTimeFromNow from '~/utils/time';

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
      <ScrollView>
        {data?.data.map(_item => (
          <Pressable key={_item.id} onPress={() => onMoveContent(_item.id)}>
            <HStack
              py={16}
              px={20}
              justifyContent="space-between"
              borderBottomWidth={1}
              borderBottomColor={colors.gray[30]}>
              <VStack flex={1} alignItems="flex-start">
                <Text
                  color={colors.gray[80]}
                  fontSize={16}
                  fontWeight={'bold'}
                  mb={4}>
                  {_item.title ?? ''}
                </Text>

                <Text color={colors.gray[60]} fontSize={12}>
                  {getTimeFromNow(_item.updatedAt)}
                </Text>
              </VStack>

              <Icon source={'chevron-right'} size={32} />
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </WhiteSafeAreaView>
  );
}

export default NoticeList;
