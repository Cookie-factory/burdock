import React from 'react';
import {colors} from '~/constants/style';
import CustomText from '../text/Text';
import {TextProps} from 'react-native';
import {CustomTextStyle, CustomUIProps, CustomViewStyle} from '~/types/style';
import VStack from '../view/VStack';

interface Props {
  containerStyle?: CustomViewStyle;
}
/**
 *@description 폼 label 스타일 공통 컴포넌트
 */
function FormLabel(props: CustomUIProps<TextProps, CustomTextStyle> & Props) {
  return (
    <VStack pl={9} mb={8} alignItems="flex-start" style={props.containerStyle}>
      <CustomText color={colors.gray[70]} fontSize={14} {...props} />
    </VStack>
  );
}

export default FormLabel;
