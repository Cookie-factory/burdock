import React from 'react';
import {ModalProps} from 'react-native-paper';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';
import Modal from '../modal/Modal';

/**
 *@description Popup ui,
 *@TODO 추후 style props 수정
 */
function Popup(props: CustomUIProps<ModalProps>) {
  const transformStyle = styleTransform(props);

  return (
    <Modal {...props} style={[transformStyle, props.style]}>
      {props.children}
    </Modal>
  );
}

export default Popup;
