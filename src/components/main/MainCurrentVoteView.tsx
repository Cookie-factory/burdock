import React from 'react';
import VStack from '../common/view/VStack';
import MoreView from '../common/view/MoreView';
import HStack from '../common/view/HStack';
import CustomText from '../common/text/Text';
import {colors} from '~/constants/style';
import CustomImage from '../common/image/Image';
import useNavigate from '~/hooks/navigator/useNavigation';
import {useGetRanking3PerThemes} from '~/apis/vote/hook';

/**
 *@description 금일 테마 투표
 */
function MainCurrentVoteView() {
  const {navigate} = useNavigate();

  const {data} = useGetRanking3PerThemes();

  const firstTheme = data?.data[0];

  if (!firstTheme) return <></>;

  return (
    <VStack borderWidth={1}>
      <MoreView
        text="진행 중인 테마 보기"
        onPress={() => navigate('VoteMain')}
      />

      <HStack mb={12}>
        <CustomImage
          w={'100%'}
          h={128}
          source={{
            uri: firstTheme.imgUrl,
          }}
        />
      </HStack>

      <HStack>
        <CustomText fontWeight={'bold'} color={colors.gray[80]} mr={29}>
          {firstTheme?.title}
        </CustomText>

        <CustomText
          fontSize={14}
          fontWeight={'bold'}
          mr={12}
          color={colors.orange[0]}>
          1위
        </CustomText>
        <CustomText color={colors.gray[70]}>
          {firstTheme ? firstTheme?.topCandidates[0].character.name : ''}
        </CustomText>
      </HStack>
    </VStack>
  );
}

export default MainCurrentVoteView;
