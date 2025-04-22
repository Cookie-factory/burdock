import React from 'react';
import HStack from '../view/HStack';
import CenterButton from '../button/CenterButton';
import CustomText from '../text/Text';
import {colors} from '~/constants/style';

interface Props {
  firstTabName: string;
  secondTabName: string;
  onFirstTabPress: () => void;
  onSecondTabPress: () => void;
  tabStatus: number; // 1이면 첫번쩨 탭, 2이면 두번째 탭 활성화
}

/**
 *@description 라운드 탭 컴포넌트
 */
function RoundTab({
  firstTabName,
  secondTabName,
  onFirstTabPress,
  onSecondTabPress,
  tabStatus,
}: Props) {
  return (
    <HStack
      justifyContent="center"
      w={300}
      h={58}
      borderWidth={1}
      borderColor={colors.gray[20]}
      bgColor={colors.gray[30]}
      borderRadius={52}
      mb={56}>
      <CenterButton
        w={141}
        h={44}
        borderRadius={43}
        borderWidth={tabStatus === 1 ? 1 : 0}
        borderColor={colors.gray[20]}
        bgColor={tabStatus === 1 ? colors.gray[0] : 'transparent'}
        onPress={onFirstTabPress}>
        <CustomText fontWeight={'bold'}>{firstTabName}</CustomText>
      </CenterButton>

      <CenterButton
        w={141}
        h={44}
        borderRadius={43}
        borderWidth={tabStatus === 2 ? 1 : 0}
        borderColor={colors.gray[20]}
        bgColor={tabStatus === 2 ? colors.gray[0] : 'transparent'}
        onPress={onSecondTabPress}>
        <CustomText fontWeight={'bold'}>{secondTabName}</CustomText>
      </CenterButton>
    </HStack>
  );
}

export default RoundTab;
