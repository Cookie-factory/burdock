import React, {useState} from 'react';
import {TextStyle} from 'react-native';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import ImageDefaultProfile72 from '~/assets/images/ImageDefaultProfile72.svg';
import IconPlus16 from '~/assets/icons/IconPlus16.svg';
import useNavigate from '~/hooks/navigator/useNavigation';
import {useGetAuthInfo} from '~/apis/auth/hook';
import CustomImage from '~/components/common/image/Image';

function MyInfoView() {
  const {navigate} = useNavigate();
  const {data: getAuthInfoData} = useGetAuthInfo();
  const [isProfileImageError, setProfileImageError] = useState(false);

  const {nickname, profile, introduce, firstCharacter, _count} =
    getAuthInfoData?.data ?? {
      nickname: '',
      profile: undefined,
      introduce: '',
      firstCharacter: {
        id: '',
        name: '',
      },
      _count: {
        Board: 0,
      },
    };

  const subTextStyle = {
    fontSize: 10,
    color: colors.gray[70],
  };

  const mainTextStyle = {
    fontWeight: 'bold' as TextStyle['fontWeight'],
    fontSize: 14,
    color: colors.gray[80],
  };

  const onMoveMyInfoModification = () => {
    navigate('MyPageModification');
  };

  const onMoveFollowPage = () => {
    navigate('FollowPage');
  };
  return (
    <HStack marginBottom={16} gap={32}>
      <VStack w="auto">
        <CenterButton mb={12}>
          {profile && !isProfileImageError ? (
            <CustomImage
              source={{uri: profile}}
              w={72}
              h={72}
              borderRadius={72}
              onError={() => {
                setProfileImageError(true);
              }}
            />
          ) : (
            <ImageDefaultProfile72 />
          )}

          <VStack
            position="absolute"
            bottom={4}
            right={4}
            zIndex={1}
            w={'auto'}>
            <IconPlus16 />
          </VStack>
        </CenterButton>

        <CenterButton
          onPress={onMoveMyInfoModification}
          w={79}
          h={35}
          borderRadius={8}
          borderWidth={1}
          borderColor={colors.gray[60]}>
          <CustomText fontSize={12} color={colors.gray[80]}>
            프로필 수정
          </CustomText>
        </CenterButton>
      </VStack>

      <VStack gap={12}>
        <VStack gap={4} alignItems="flex-start">
          <CustomText {...subTextStyle}>{introduce}</CustomText>
          <CustomText {...mainTextStyle}>{nickname}</CustomText>
        </VStack>

        <VStack gap={4} alignItems="flex-start">
          <CustomText {...subTextStyle}>{firstCharacter.name}</CustomText>
          <CustomText {...mainTextStyle}>최애</CustomText>
        </VStack>

        <HStack gap={13} alignItems="flex-start">
          <VStack gap={4} w={'auto'} alignItems="flex-start">
            <CustomText {...subTextStyle}>{_count.Board}</CustomText>
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
    </HStack>
  );
}

export default MyInfoView;
