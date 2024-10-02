/**
 *@description 스타일 관련 통합 타입 스크립트
 */

import {
  PressableProps as _PressableProps,
  ImageProps,
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {MakeOptional} from '../util/utility';
import {ModalProps} from 'react-native-paper';

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
    | ImageProps = ViewProps,
  K extends ViewStyle | TextStyle | ImageStyle = ViewStyle,
> = MakeOptional<T, 'style'> & K;
