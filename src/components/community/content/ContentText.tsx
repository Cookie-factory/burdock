import React from 'react';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';

interface Props {
  content: string;
}

/**
 *@description 컨텐트 내용
 */
function ContentText({content}: Props) {
  return (
    <HStack minH={120} borderWidth={1} py={10} alignItems="flex-start">
      <Text fontSize={11} w={'100%'} borderWidth={1}>
        {content}
      </Text>
    </HStack>
  );
}

export default ContentText;
