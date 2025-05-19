import React, {useState} from 'react';
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
import MyInfoDetailView from './MyInfoDetailView';

function MyInfoView() {
  const {navigate} = useNavigate();
  const {data: getAuthInfoData} = useGetAuthInfo();
  const [isProfileImageError, setProfileImageError] = useState(false);

  const {id, nickname, profile, introduce, firstCharacter, _count} =
    getAuthInfoData?.data ?? {
      id: undefined,
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

  const onMoveMyInfoModification = () => {
    navigate('MyPageModification');
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

      <MyInfoDetailView
        targetUserId={id ?? ''}
        introduce={introduce ?? ''}
        nickname={nickname}
        firstCharacter={{
          name: firstCharacter.name,
        }}
        _count={{
          Board: _count.Board,
        }}
      />
    </HStack>
  );
}

export default MyInfoView;
