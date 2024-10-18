import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HStack from '../view/HStack';
import {colors, uiStyle} from '~/constants/style';
import Center from '../view/Center';
import Text from '../text/Text';

interface Props {
  title?: string;
  rightButton?: JSX.Element;
  leftButton?: JSX.Element;
  isRemoveTopPosition?: boolean;
}
/**
 *@description 페이지 헤더
 *@param {JSX.Element} rightButton - 헤더 기준 좌쪽 위치 버튼
 *@param {JSX.Element} leftButton - 헤더 기준 우쪽 위치 버튼
 */
function Header({title, rightButton, leftButton, isRemoveTopPosition}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <HStack
      top={isRemoveTopPosition ? undefined : insets.top}
      alignItems={'center'}
      height={uiStyle.header.height}
      bgColor={colors.gray[0]}>
      <HStack left={18} position={'absolute'} zIndex={1}>
        {leftButton}
      </HStack>

      <Center w="100%">
        <Text fontWeight={'500'} fontSize={18} color={colors.gray[90]}>
          {title || ''}
        </Text>
      </Center>

      <HStack right={18} position={'absolute'} zIndex={1}>
        {rightButton}
      </HStack>
    </HStack>
  );
}

export default Header;
