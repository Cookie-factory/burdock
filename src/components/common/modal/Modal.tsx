import React from 'react';
import {Modal as _Modal, ModalProps} from 'react-native-paper';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description Modal ui,
 *@TODO 추후 style props 수정
 */
function CustomModal(props: CustomUIProps<ModalProps>) {
  const transformStyle = styleTransform(props);

  return (
    <_Modal {...props} style={[transformStyle, props.style]}>
      {props.children}
    </_Modal>
  );
}

export default CustomModal;
