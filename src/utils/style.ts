import {TextStyle, ViewStyle} from 'react-native';

const styleKey = [
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'borderWidth',
  'borderRadius',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginVertical',
  'marginHorizontal',
  'paddingVertical',
  'paddingHorizontal',
  'justifyContent',
  'alignItems',
  'flexDirection',
] as const;

/**
 *@description style 커스텀 유틸
 */
export const styleTransform = <T extends ViewStyle | TextStyle = ViewStyle>(
  props: T,
  defaultStyle?: T,
): T => {
  const tmp: ViewStyle | TextStyle = {};

  styleKey.forEach(_key => {
    tmp[_key] = (
      defaultStyle ? props[_key] ?? defaultStyle[_key] : props[_key]
    ) as any;
  });
  return tmp as T;
};
