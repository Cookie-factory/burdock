import React, {useState} from 'react';
import {TextStyle} from 'react-native';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {colors} from '~/constants/style';
import ImageDefaultProfile72 from '~/assets/images/ImageDefaultProfile72.svg';
import useNavigate from '~/hooks/navigator/useNavigation';
import CustomImage from '~/components/common/image/Image';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import InnerLayout from '~/components/common/layout/InnerLayout';
import useParam from '~/hooks/navigator/useParam';
import {useGetUserInfo} from '~/apis/user/hook';
import {usePatchFollow} from '~/apis/follow/hook';
import useToastShow from '~/hooks/toast/useToastShow';
import _ from 'lodash';
import {toastText} from '~/constants/text';
import FollowButton from '~/components/common/button/FollowButton';
import MyInfoDetailView from '~/components/mypage/main/MyInfoDetailView';

/**
 *@description 유저 정보 페이지
 */
function UserInfo() {
  const {navigate} = useNavigate();
  const userInfoParam = useParam('UserInfo');
  const [isProfileImageError, setProfileImageError] = useState(false);
  const {mutateAsync} = usePatchFollow();
  const {onShowToast} = useToastShow();

  const {data, refetch} = useGetUserInfo(userInfoParam?.targetUserId);

  const {nickname, profile, introduce, firstCharacter, _count, follower} =
    data?.data ?? {
      nickname: '',
      profile: undefined,
      introduce: '',
      firstCharacter: {
        id: '',
        name: '',
      },
      _count: {
        Board: 0,
        follower: 0,
        following: 0,
      },
      follower: [],
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

  const onMoveFollowPage = () => {
    if (userInfoParam?.targetUserId) {
      navigate('FollowPage', {targetUserId: userInfoParam?.targetUserId});
    } else {
      onShowToast({
        text1: toastText.error.wrongApproach,
      });
    }
  };

  const onFollow = () => {
    //
    if (userInfoParam?.targetUserId) {
      mutateAsync(userInfoParam?.targetUserId).then(response => {
        if (response.statusCode / 100 === 2) {
          refetch();
        }
      });
    } else {
      onShowToast({text1: toastText.error.wrongApproach});
    }
  };

  return (
    <WhiteSafeAreaView>
      <InnerLayout>
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
            </CenterButton>

            <FollowButton
              isActive={!_.isEmpty(follower)}
              refetch={refetch}
              targetUserId={userInfoParam?.targetUserId}
            />
          </VStack>

          <MyInfoDetailView
            targetUserId={userInfoParam?.targetUserId ?? ''}
            introduce={introduce ?? ''}
            nickname={nickname}
            firstCharacter={{
              name: firstCharacter?.name ?? '',
            }}
            _count={{
              Board: _count.Board,
            }}
          />
        </HStack>
      </InnerLayout>
    </WhiteSafeAreaView>
  );
}

export default UserInfo;
