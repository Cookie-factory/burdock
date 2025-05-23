import React from 'react';
import Popup from '~/components/common/popup/Popup';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOkPress: () => void;
  onCancelPress: () => void;
}

/**
 *@description 차단 허용여부 팝업 컴포넌트
 */
function BlockPopup({isOpen, onClose, onOkPress, onCancelPress}: Props) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onOkPress={onOkPress}
      onCancelPress={onCancelPress}
      okText={'차단하기'}
      cancelText={'취소하기'}
      title={'차단하시겠습니까?'}></Popup>
  );
}

export default BlockPopup;
