import React from 'react';
import {CustomModalProps, CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';
import Modal from 'react-native-modal';

/**
 *@description Modal ui,
 *@TODO 추후 style props 수정
 */
function CustomModal(props: CustomUIProps<CustomModalProps>) {
  const transformStyle = styleTransform(props);

  return (
    <Modal {...props} style={[transformStyle, props.style]} avoidKeyboard>
      {props.children}
    </Modal>
  );
}

export default CustomModal;
