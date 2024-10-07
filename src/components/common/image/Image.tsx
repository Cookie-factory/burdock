import React from 'react';
import {Image, ImageProps} from 'react-native';
import {CustomImageStyle, CustomUIProps} from '~/types/style';
import {styleTransform} from '~/utils/style';

/**
 *@description Image ui
 */
function CustomImage(props: CustomUIProps<ImageProps, CustomImageStyle>) {
  const transformStyle = styleTransform<CustomImageStyle>(props);

  return <Image {...props} style={[transformStyle, props.style]} />;
}

export default CustomImage;
