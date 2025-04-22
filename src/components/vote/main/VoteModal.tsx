import React, {useState} from 'react';
import {usePostVote} from '~/apis/vote/hook';
import CenterButton from '~/components/common/button/CenterButton';
import CustomInput from '~/components/common/input/Input';
import CustomModal from '~/components/common/modal/Modal';
import CustomModalContent from '~/components/common/modal/ModalContent';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import VStack from '~/components/common/view/VStack';
import {APP_WIDTH} from '~/utils/dimension';
import IconVote20 from '~/assets/icons/IconVote20.svg';
import {colors} from '~/constants/style';
import Center from '~/components/common/view/Center';
import IconMinus14 from '~/assets/icons/IconMinus14.svg';
import IconPlus14 from '~/assets/icons/IconPlus14.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  celebrityId?: string;
  refetch: () => void;
}
function VoteModal({isOpen, onClose, celebrityId, refetch}: Props) {
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
            refetch();
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
    <CustomModal
      visible={isOpen}
      onDismiss={onClose}
      justifyContent="center"
      alignItems="center">
      <CustomModalContent w={APP_WIDTH - 40} h={260} py={30}>
        <VStack flex={1} justifyContent="space-between">
          <VStack>
            <CustomText mb={12}>나루토에게 투표하기</CustomText>

            <HStack mb={44} gap={6} justifyContent="center">
              <IconVote20 />
              <CustomText fontWeight={'bold'} color={colors.positive[-10]}>
                20표 보유
              </CustomText>

              <Center
                w={38}
                h={24}
                borderRadius={24}
                bgColor={colors.orange[10]}>
                <CustomText
                  color={colors.gray[10]}
                  fontSize={0}
                  fontWeight={'bold'}>
                  충전
                </CustomText>
              </Center>
            </HStack>

            <HStack w="auto" mb={26}>
              <CenterButton
                borderTopLeftRadius={44}
                borderBottomLeftRadius={44}
                w={44}
                h={44}
                bgColor={colors.gray[40]}>
                <IconMinus14 />
              </CenterButton>

              <CustomInput
                containerStyle={{
                  width: 'auto',
                }}
                textAlign="center"
                w={200}
                h={44}
                borderTopWidth={1}
                borderBottomWidth={1}
                borderColor={colors.gray[40]}
                value={count.toString()}
                onChangeText={text => setCount(Number(text))}
                placeholder="갯수"
                keyboardType="number-pad"
              />

              <CenterButton
                borderTopRightRadius={44}
                borderBottomRightRadius={44}
                w={44}
                h={44}
                bgColor={colors.gray[40]}>
                <IconPlus14 />
              </CenterButton>
            </HStack>
          </VStack>

          <HStack gap={10} justifyContent="center">
            <CenterButton
              borderRadius={16}
              w={94}
              h={35}
              bgColor={colors.gray[50]}
              onPress={onClose}>
              <CustomText fontWeight={'bold'} color={colors.gray[0]}>
                취소
              </CustomText>
            </CenterButton>

            <CenterButton
              borderRadius={16}
              w={94}
              h={35}
              bgColor={colors.positive[-10]}
              onPress={onRegister}>
              <CustomText fontWeight={'bold'} color={colors.gray[0]}>
                투표하기
              </CustomText>
            </CenterButton>
          </HStack>
        </VStack>
      </CustomModalContent>
    </CustomModal>
  );
}

export default VoteModal;
