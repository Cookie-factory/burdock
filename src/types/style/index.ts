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
import {styleKey, styleTransformKey} from '~/constants/style';
import {ReactChildren} from 'react-native-toast-message';

// style 통합 이슈에 따른 => style type 재정의
export type PressableProps<
  T extends
    | StyleProp<ViewStyle>
    | _PressableProps['style'] = StyleProp<ViewStyle>,
> = _PressableProps & {
  style: T;
};

export type CustomModalProps = {
  isVisible: boolean;
  onDismiss: () => void;
} & {
  children: ReactChildren;
  style: StyleProp<ViewStyle>;
};

export type CustomUIProps<
  T extends
    | ViewProps
    | PressableProps
    | TextInputProps
    | ImageProps
    | CustomModalProps
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
