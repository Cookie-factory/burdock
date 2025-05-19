import React from 'react';
import {TextStyle} from 'react-native';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import {toastText} from '~/constants/text';
import useNavigate from '~/hooks/navigator/useNavigation';
import useToastShow from '~/hooks/toast/useToastShow';
import {MyInfoDetailViewType} from '~/types/api/user';

function MyInfoDetailView(props: MyInfoDetailViewType) {
  const {navigate} = useNavigate();
  const {onShowToast} = useToastShow();

  const subTextStyle = {
    fontSize: 10,
    color: colors.gray[70],
  };

  const mainTextStyle = {
    fontWeight: 'bold' as TextStyle['fontWeight'],
    fontSize: 14,
    color: colors.gray[80],
  };

  const onMoveFollowPage = () => {
    if (props.targetUserId) {
      navigate('FollowPage', {targetUserId: props.targetUserId});
    } else {
      onShowToast({text1: toastText.error.wrongApproach});
    }
  };

  return (
    <VStack gap={12}>
      <VStack gap={4} alignItems="flex-start">
        <CustomText {...subTextStyle}>{props.introduce}</CustomText>
        <CustomText {...mainTextStyle}>{props.nickname}</CustomText>
      </VStack>

      <VStack gap={4} alignItems="flex-start">
        <CustomText {...subTextStyle}>
          {props.firstCharacter?.name ?? ''}
        </CustomText>
        <CustomText {...mainTextStyle}>최애</CustomText>
      </VStack>

      <HStack gap={20} alignItems="flex-start">
        <VStack gap={4} w={'auto'} alignItems="flex-start">
          <CustomText {...subTextStyle}>{props._count.Board}</CustomText>
          <CustomText {...mainTextStyle}>게시물</CustomText>
        </VStack>

        <CenterButton
          onPress={onMoveFollowPage}
          gap={4}
          w={'auto'}
          alignItems="flex-start">
          <CustomText {...subTextStyle}>0</CustomText>
          <CustomText {...mainTextStyle}>팔로워</CustomText>
        </CenterButton>

        <CenterButton
          onPress={onMoveFollowPage}
          gap={4}
          w={'auto'}
          alignItems="flex-start">
          <CustomText {...subTextStyle}>0</CustomText>
          <CustomText {...mainTextStyle}>팔로잉</CustomText>
        </CenterButton>
      </HStack>
    </VStack>
  );
}

export default MyInfoDetailView;
