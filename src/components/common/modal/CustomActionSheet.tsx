import React, {PropsWithChildren, useEffect, useRef} from 'react';
import ActionSheet, {
  ActionSheetRef,
  registerSheet,
} from 'react-native-actions-sheet';
import VStack from '../view/VStack';
import {CustomUIProps} from '~/types/style';
import {ViewProps} from 'react-native';
import {styleTransform} from '~/utils/style';

interface Props {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
}

/**
 *@description action sheet 공통 컴포넌트
 */
function CustomActionSheet(
  props: CustomUIProps<ViewProps> & PropsWithChildren<Props>,
) {
  const ref = useRef<ActionSheetRef | null>(null);
  const transformStyle = styleTransform(props);

  useEffect(() => {
    if (ref.current) {
      if (props.isOpen) {
        ref.current.show();
      } else {
        ref.current.hide();
      }
    }
  }, [props.isOpen]);

  return (
    <ActionSheet ref={ref} id="helloworld_sheet" onClose={props.onClose}>
      <VStack {...props} style={[transformStyle, props.style]}>
        {props.children}
      </VStack>
    </ActionSheet>
  );
}

// Register your Sheet component.
registerSheet('CustomActionSheet', CustomActionSheet);

export default CustomActionSheet;
