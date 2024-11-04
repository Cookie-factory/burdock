import React, {useState} from 'react';
import CenterButton from '~/components/common/button/CenterButton';
import CustomInput from '~/components/common/input/Input';
import CustomModal from '~/components/common/modal/Modal';
import CustomModalContent from '~/components/common/modal/ModalContent';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';

interface Props {
  isOpen: boolean;
}
function VoteModal({isOpen}: Props) {
  const [count, setCount] = useState(0);

  return (
    <CustomModal visible={isOpen}>
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
            <CenterButton>
              <CustomText>등록</CustomText>
            </CenterButton>
          </VStack>
        </VStack>
      </CustomModalContent>
    </CustomModal>
  );
}

export default VoteModal;
