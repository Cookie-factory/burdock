import React from 'react';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import {colors} from '~/constants/style';

interface Props {
  content: string;
}

/**
 *@description 컨텐트 내용
 */
function ContentText({content}: Props) {
  return (
    <HStack minH={80} py={10} alignItems="flex-start">
      <Text fontSize={11} w={'100%'} color={colors.gray[80]}>
        {content}
      </Text>
    </HStack>
  );
}

export default ContentText;
