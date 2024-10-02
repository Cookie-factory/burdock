import React from 'react';
import {Image, ImageProps, ImageStyle} from 'react-native';
import {CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description Image ui
 */
function CustomImage(props: CustomUIProps<ImageProps, ImageStyle>) {
  const transformStyle = styleTransform(props);

  return <Image {...props} style={[transformStyle, props.style]} />;
}

export default CustomImage;
