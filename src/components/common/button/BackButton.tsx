import React from 'react';
import BackIcon from '~/assets/icons/IconBack24.svg';
import CenterButton from './CenterButton';
import useNavigate from '~/hooks/navigator/useNavigation';

interface Props {
  onPress?: () => void;
}

/**
 *@description 페이지 헤더 뒤로가기 용 백버튼
 */
function BackButton({onPress}: Props) {
  const {goBack} = useNavigate();

  const onBack = () => {
    if (onPress) onPress();
    else goBack();
  };

  return (
    <CenterButton
      w={'40px'}
      h={'40px'}
      alignItems={'flex-start'}
      onPress={onBack}>
      <BackIcon />
    </CenterButton>
  );
}

export default BackButton;
