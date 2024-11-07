import React from 'react';
import {colors} from '~/constants/style';
import CustomText from '../text/Text';
import {TextProps} from 'react-native';
import {CustomTextStyle, CustomUIProps, CustomViewStyle} from '~/types/style';
import VStack from '../view/VStack';

interface Props {
  containerStyle?: CustomViewStyle;
  isShow: boolean;
}
/**
 *@description 폼 error message 스타일 공통 컴포넌트
 */
function FormErrorMessage(
  props: CustomUIProps<TextProps, CustomTextStyle> & Props,
) {
  const height = 32;
  return props.isShow ? (
    <VStack
      h={height}
      pt={6}
      pl={14}
      alignItems="flex-start"
      style={props.containerStyle}>
      <CustomText color={colors.red[50]} fontSize={12} {...props} />
    </VStack>
  ) : (
    <VStack h={height} style={props.containerStyle}></VStack>
  );
}

export default FormErrorMessage;
