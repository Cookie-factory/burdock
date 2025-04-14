import React from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import getTimeFromNow from '~/utils/time';
import IconDefaultHeart12 from '~/assets/icons/IconDefaultHeart12.svg';
import CenterButton from '~/components/common/button/CenterButton';
import Text from '~/components/common/text/Text';

interface Props {}
function CommentItem() {
  const infoTextStyle = {
    color: colors.gray[80],
    fontSize: 10,
  };

  return (
    <HStack
      alignItems="flex-start"
      py={16}
      borderBottomWidth={1}
      borderBottomColor={colors.gray[40]}>
      <HStack
        w={28}
        h={28}
        mr={15}
        bgColor={colors.gray[60]}
        borderRadius={28}
      />

      <VStack alignItems="flex-start" w="auto">
        <HStack justifyContent="space-between" py={8} mb={0}>
          <HStack w="auto">
            <CustomText fontWeight={'bold'} fontSize={10} mr={8}>
              hit_tester
            </CustomText>

            <CustomText fontSize={10}>{getTimeFromNow('20250404')}</CustomText>
          </HStack>
        </HStack>

        <HStack my={10} alignItems="flex-start" minH={32} w={'auto'}>
          <Text {...infoTextStyle}>{'와우 대단'}</Text>
        </HStack>

        <HStack w={'auto'} gap={20}>
          <CenterButton flexDirection="row" w="auto" gap={6} width={32}>
            <IconDefaultHeart12 />

            <Text {...infoTextStyle}>120</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>답글</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>삭제</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>차단</Text>
          </CenterButton>

          <CenterButton width={32} h={32}>
            <Text {...infoTextStyle}>신고</Text>
          </CenterButton>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default CommentItem;
