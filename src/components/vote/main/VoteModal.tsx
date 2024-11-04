import React, {useState} from 'react';
import {usePostVote} from '~/apis/vote/hook';
import CenterButton from '~/components/common/button/CenterButton';
import CustomInput from '~/components/common/input/Input';
import CustomModal from '~/components/common/modal/Modal';
import CustomModalContent from '~/components/common/modal/ModalContent';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  celebrityId?: string;
}
function VoteModal({isOpen, onClose, celebrityId}: Props) {
  const [count, setCount] = useState(0);
  const postVote = usePostVote();

  const onRegister = () => {
    if (!postVote.isPending && celebrityId) {
      postVote
        .mutateAsync({
          celebrityId,
          count,
        })
        .then(response => {
          if (response.statusCode === 201) {
            console.log('@@@ VoteModal');
            console.log('등록이 되었습니다.');
            console.log(
              '%c등록이 되었습니다.',
              'color: red; font-weight: bold; font-size: 50px;',
            );

            onClose();
          }
        })
        .catch(error => {
          //
          console.log(error);
        });
    } else {
      console.log('잘못된 접근입니다.');
    }
  };

  return (
    <CustomModal visible={isOpen} onDismiss={onClose}>
      <CustomModalContent>
        <VStack flex={1} justifyContent="space-between">
          <VStack>
            <CustomText mb={24}>제목</CustomText>

            <CustomInput
              value={count.toString()}
              onChangeText={text => setCount(Number(text))}
              placeholder="갯수"
              keyboardType="number-pad"
            />
          </VStack>

          <VStack>
            <CenterButton onPress={onRegister}>
              <CustomText>등록</CustomText>
            </CenterButton>
          </VStack>
        </VStack>
      </CustomModalContent>
    </CustomModal>
  );
}

export default VoteModal;
