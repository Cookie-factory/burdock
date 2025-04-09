import React from 'react';
import {colors} from '~/constants/style';
import ImagesMainHeaderLogo from '~/assets/images/ImagesMainHeaderLogo.svg';
import IconAlarm16 from '~/assets/icons/IconAlarm16.svg';
import IconMenu16 from '~/assets/icons/IconMenu16.svg';
import HStack from '../common/view/HStack';
import Text from '../common/text/Text';
import useNavigate from '~/hooks/navigator/useNavigation';
import CenterButton from '../common/button/CenterButton';

/**
 *@description 메인 페이지 헤더
 *@param {JSX.Element} rightButton - 헤더 기준 좌쪽 위치 버튼
 *@param {JSX.Element} leftButton - 헤더 기준 우쪽 위치 버튼
 */
function MainHeader() {
  const {navigate} = useNavigate();

  const onMoveMenu = () => {
    navigate('MenuMain');
  };
  return (
    <HStack
      justifyContent="space-between"
      alignItems={'center'}
      height={72}
      bgColor={colors.gray[0]}>
      <ImagesMainHeaderLogo />

      <HStack justifyContent="space-between" alignItems="center" width={82}>
        <CenterButton w={36} h={38}>
          <IconAlarm16 />

          <Text marginTop={4}>알림</Text>
        </CenterButton>

        <CenterButton w={36} h={38} onPress={onMoveMenu}>
          <IconMenu16 />

          <Text marginTop={4}>메뉴</Text>
        </CenterButton>
      </HStack>
    </HStack>
  );
}

export default MainHeader;
