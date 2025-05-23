import React, {useState} from 'react';
import {usePostBlock} from '~/apis/block/hook';
import CenterButton from '~/components/common/button/CenterButton';
import CustomText from '~/components/common/text/Text';
import {colors} from '~/constants/style';
import useToastShow from '~/hooks/toast/useToastShow';

interface Props {
  refetch: () => void;
  blockedId: string;
}
function NonBlockedButton({refetch, blockedId}: Props) {
  const {mutateAsync: postBlockMutate} = usePostBlock();
  const {onShowToast} = useToastShow();

  const onNonBlock = () => {
    postBlockMutate(blockedId).then(response => {
      if (response.statusCode === 201) {
        onShowToast({
          text1: '차단 해제되었습니다.',
        });
        refetch();
      }
    });
  };
  return (
    <CenterButton
      onPress={onNonBlock}
      w={90}
      h={35}
      borderRadius={8}
      borderWidth={1}
      bgColor={colors.gray[0]}
      borderColor={colors.gray[50]}>
      <CustomText fontSize={12} fontWeight={'bold'} color={colors.gray[60]}>
        {'차단해제'}
      </CustomText>
    </CenterButton>
  );
}

export default NonBlockedButton;
