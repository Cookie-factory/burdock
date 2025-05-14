import React from 'react';
import Text from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';

interface Props {
  title: string;
}

/**
 *@description 컨텐트 제목
 */
function ContentTitle({title}: Props) {
  return (
    <HStack h={18} mb={6}>
      <Text w={'100%'} fontWeight={'bold'}>
        {title}
      </Text>
    </HStack>
  );
}

export default ContentTitle;
