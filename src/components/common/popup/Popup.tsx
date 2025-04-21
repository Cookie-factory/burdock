import React, {PropsWithChildren} from 'react';

import VStack from '../view/VStack';
import {CustomUIProps} from '~/types/style';
import {ViewProps} from 'react-native';
import {styleTransform} from '~/utils/style';
import CustomText from '../text/Text';
import Modal from 'react-native-modal';
import ActiveButton from '../button/ActiveButton';
import {colors} from '~/constants/style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOkPress: () => void;
  onCancelPress: () => void;
  okText: string;
  cancelText: string;
  title: string;
}

/**
 *@description Popup ui,
 */
function Popup(props: CustomUIProps<ViewProps> & PropsWithChildren<Props>) {
  const transformStyle = styleTransform(props);

  return (
    <Modal
      onDismiss={props.onClose}
      isVisible={props.isOpen}
      avoidKeyboard
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <VStack
        borderWidth={1}
        borderColor={colors.gray[50]}
        bgColor={'#fff'}
        w={300}
        borderRadius={12}
        px={28}
        py={32}
        gap={28}
        {...props}
        style={[transformStyle, props.style]}>
        <CustomText fontSize={14} fontWeight={'bold'} color={colors.gray[80]}>
          {props.title}
        </CustomText>

        <VStack gap={12}>
          <ActiveButton
            onPress={props.onOkPress}
            text={props.okText}
            buttonType={'blue'}
          />
          <ActiveButton
            onPress={props.onCancelPress}
            text={props.cancelText}
            buttonType={'gray'}
          />
        </VStack>
      </VStack>
    </Modal>
  );
}

export default Popup;
