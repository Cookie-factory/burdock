import React from 'react';
import CenterButton from './CenterButton';
import {colors} from '~/constants/style';
import CustomText from '../text/Text';
import {usePatchFollow} from '~/apis/follow/hook';
import useToastShow from '~/hooks/toast/useToastShow';
import {toastText} from '~/constants/text';

interface Props {
  isActive: boolean;
  refetch: () => void;
  targetUserId?: string;
}

/**
 *@description follow 버튼 공통
 */
function FollowButton({isActive, refetch, targetUserId}: Props) {
  const {mutateAsync} = usePatchFollow();
  const {onShowToast} = useToastShow();

  /**
   *@description follow api 실행 이벤트
   */
  const onFollow = () => {
    if (targetUserId) {
      mutateAsync(targetUserId).then(response => {
        if (response.statusCode / 100 === 2) {
          refetch();
        }
      });
    } else {
      onShowToast({text1: toastText.error.wrongApproach});
    }
  };

  return (
    <CenterButton
      onPress={onFollow}
      w={90}
      h={35}
      borderRadius={8}
      borderWidth={1}
      bgColor={isActive ? colors.gray[0] : colors.positive[0]}
      borderColor={isActive ? colors.gray[50] : colors.positive[-10]}>
      <CustomText
        fontSize={12}
        fontWeight={'bold'}
        color={isActive ? colors.gray[60] : colors.gray[0]}>
        {isActive ? '팔로우 취소' : '팔로우'}
      </CustomText>
    </CenterButton>
  );
}

export default FollowButton;
