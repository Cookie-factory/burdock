import React from 'react';
import VStack from '../common/view/VStack';
import MoreView from '../common/view/MoreView';
import HStack from '../common/view/HStack';
import CustomText from '../common/text/Text';
import {colors} from '~/constants/style';
import CustomImage from '../common/image/Image';

/**
 *@description 금일 인기 있는 투표 요약 뷰
 */
function MainCurrentVoteView() {
  return (
    <VStack>
      <MoreView text="진행 중인 투표" onPress={() => {}} />

      <HStack mb={12}>
        <CustomImage
          w={'100%'}
          h={128}
          source={{
            uri: 'https://i.namu.wiki/i/Q--xh7Fdq_iGi_wFeW0v2FqiN11HrWHPDiLADLPZXL0dqlNwmVGIj6U-FQwhCyurszC9TXO6WXfhlXa1Nb06E-k6F3kYyA91mpFZ35mHyg2N8MHS9Y4NCkJ-pgfdb3jmj1hYpIk-bLNlQtfWjOSCOg.webp',
          }}
        />
      </HStack>

      <HStack>
        <CustomText fontWeight={'bold'} color={colors.gray[80]} mr={29}>
          원피스 최강 캐릭터 투표
        </CustomText>

        <CustomText
          fontSize={14}
          fontWeight={'bold'}
          mr={12}
          color={colors.orange[0]}>
          1위
        </CustomText>
        <CustomText color={colors.gray[70]}>루피</CustomText>
      </HStack>
    </VStack>
  );
}

export default MainCurrentVoteView;
