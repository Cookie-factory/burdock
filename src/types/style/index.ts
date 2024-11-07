/**
 *@description 스타일 관련 통합 타입 스크립트
 */

import {
  PressableProps as _PressableProps,
  ImageProps,
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {MakeOptional} from '../util/utility';
import {ModalProps} from 'react-native-paper';
import {styleKey, styleTransformKey} from '~/constants/style';

// style 통합 이슈에 따른 => style type 재정의
export type PressableProps<
  T extends
    | StyleProp<ViewStyle>
    | _PressableProps['style'] = StyleProp<ViewStyle>,
> = _PressableProps & {
  style: T;
};

export type CustomModalProps = ModalProps & {
  visible: boolean;
  onDismiss: () => void;
};

export type CustomUIProps<
  T extends
    | ViewProps
    | PressableProps
    | TextInputProps
    | CustomModalProps
    | ImageProps
    | TextProps = ViewProps,
  K extends
    | CustomViewStyle
    | CustomTextStyle
    | CustomImageStyle = CustomViewStyle,
> = MakeOptional<T, 'style'> & K;

// 커스텀 style props 타입 -> styleTransformKey 상수로 타입 지정
export type CustomStyle = {
  [_key in keyof typeof styleTransformKey]?: string | number;
} & Pick<TextStyle, 'fontSize' | 'fontWeight' | 'color'>;

export type CustomViewStyle = ViewStyle & CustomStyle;

export type CustomTextStyle = TextStyle & CustomStyle;

export type CustomImageStyle = ImageStyle & CustomStyle;

export type CustomMergeStyle =
  | CustomViewStyle
  | CustomTextStyle
  | CustomImageStyle;

// styleTransform 유틸 key list
export type StyleKeyList = keyof typeof styleKey;
