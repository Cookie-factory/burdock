import React from 'react';
import {colors} from '~/constants/style';
import CustomText from '../text/Text';
import {TextProps} from 'react-native';
import {CustomTextStyle, CustomUIProps, CustomViewStyle} from '~/types/style';
import VStack from '../view/VStack';
import {FormStatus} from '~/types/components/common/selector';

interface Props {
  containerStyle?: CustomViewStyle;
  isShow: boolean;
  type?: FormStatus;
}
/**
 *@description 폼 status message 스타일 공통 컴포넌트
 */
function FormStatusMessage(
  props: CustomUIProps<TextProps, CustomTextStyle> & Props,
) {
  const height = 34;
  const textColor = props?.type
    ? props.type === 'DEFAULT'
      ? colors.gray[70]
      : props.type === 'SUCCESS'
      ? colors.blue[50]
      : colors.red[50]
    : colors.red[50];

  return props.isShow ? (
    <VStack
      h={height}
      pt={6}
      pl={14}
      alignItems="flex-start"
      style={props.containerStyle}>
      <CustomText color={textColor} fontSize={12} {...props} />
    </VStack>
  ) : (
    <VStack h={22} style={props.containerStyle}></VStack>
  );
}

export default FormStatusMessage;
