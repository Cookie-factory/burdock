import {styleKey} from '~/constants/style';
import {CustomMergeStyle, CustomViewStyle, StyleKeyList} from '~/types/style';

/**
 *@description style 커스텀 유틸
 */
export const styleTransform = <T extends CustomMergeStyle = CustomViewStyle>(
  props: T,
  defaultStyle?: T,
): T => {
  const tmp: CustomMergeStyle = {};

  Object.entries(styleKey).forEach(([__key, __vaule]) => {
    const _key = __key as StyleKeyList;
    const _vaule = __vaule as StyleKeyList;

    if (props[_key]) {
      tmp[_vaule] = props[_key] as any;
    } else {
      if (defaultStyle && defaultStyle[_key]) {
        tmp[_vaule] = defaultStyle[_key] as any;
      }
    }
  });

  return tmp as T;
};
