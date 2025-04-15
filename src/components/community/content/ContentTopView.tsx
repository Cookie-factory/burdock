import React from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import IconMore24 from '~/assets/icons/IconMore24.svg';
import CenterButton from '~/components/common/button/CenterButton';
import {colors} from '~/constants/style';
import Image from '~/components/common/image/Image';

interface Props {
  authorData?: {
    id: string;
    nickname: string;
    profile?: string;
  };
}

/**
 *@description 게시글 상단 -> 유저, 추가 기능 버튼 뷰
 */
function ContentTopView({authorData}: Props) {
  return (
    <HStack justifyContent="space-between" px={20} py={8}>
      <HStack w="auto">
        <Image
          borderWidth={1}
          w={28}
          h={28}
          mr={15}
          bgColor={colors.gray[60]}
          borderRadius={28}
          source={{
            uri: authorData?.profile ?? '',
            // uri: 'https://i.namu.wiki/i/Q--xh7Fdq_iGi_wFeW0v2FqiN11HrWHPDiLADLPZXL0dqlNwmVGIj6U-FQwhCyurszC9TXO6WXfhlXa1Nb06E-k6F3kYyA91mpFZ35mHyg2N8MHS9Y4NCkJ-pgfdb3jmj1hYpIk-bLNlQtfWjOSCOg.webp',
          }}
        />

        <CustomText fontWeight={'bold'} fontSize={10}>
          {authorData?.nickname ?? ''}
        </CustomText>
      </HStack>

      <CenterButton w={38} h={38}>
        <IconMore24 />
      </CenterButton>
    </HStack>
  );
}

export default ContentTopView;
