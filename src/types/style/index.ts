/**
 *@description 스타일 관련 통합 타입 스크립트
 */

import {
  PressableProps as _PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

// style 통합 이슈에 따른 => style type 재정의
export type PressableProps<
  T extends
    | StyleProp<ViewStyle>
    | _PressableProps['style'] = StyleProp<ViewStyle>,
> = _PressableProps & {
  style: T;
};
