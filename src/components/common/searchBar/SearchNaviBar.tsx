import React from 'react';
import HStack from '../view/HStack';
import CustomText from '../text/Text';
import useNavigate from '~/hooks/navigator/useNavigation';
import CenterButton from '../button/CenterButton';
import VStack from '../view/VStack';

/**
 *@description 검색페이지 이동 이벤트 뷰  & 공용 컴포넌트
 */
function SearchNaviBar() {
  const navigate = useNavigate();

  const onMoveSearchPage = () => {
    navigate.navigate('SearchPage');
  };
  return (
    <HStack borderWidth={1}>
      <CenterButton flexDirection="row" onPress={onMoveSearchPage}>
        <VStack flex={1} />

        <CustomText borderWidth={1} w={34}>
          검색
        </CustomText>
      </CenterButton>
    </HStack>
  );
}

export default SearchNaviBar;
