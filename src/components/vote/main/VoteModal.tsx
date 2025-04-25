import React, {useState} from 'react';
import {usePostDailyVote, usePostVote} from '~/apis/vote/hook';
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
  candidateId?: string;
  refetch: () => void;
  type: 'DAILY_VOTE' | 'THEME_VOTE';
  voteSubjectId?: string;
}

/**
 *@description 투표 모달
 */
function VoteModal({
  isOpen,
  onClose,
  candidateId,
  refetch,
  type,
  voteSubjectId,
}: Props) {
  const [count, setCount] = useState(0);
  const postVote = usePostVote();
  const postDailyVote = usePostDailyVote();

  const onCount = (variantCount: number) => {
    setCount(prev => {
      const result = prev + variantCount;
      if (result < 0) return 0;
      return prev + variantCount;
    });
  };

  const onModalClose = () => {
    setCount(0);
    onClose();
  };

  const onRegister = () => {
    if (type === 'THEME_VOTE') {
      if (!postVote.isPending && candidateId && voteSubjectId) {
        postVote
          .mutateAsync({
            candidateId,
            count,
            voteSubjectId,
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
              onModalClose();
            }
          })
          .catch(error => {
            //
            console.log(error);
          });
      } else {
        console.log('잘못된 접근입니다.');
      }
    } else {
      if (!postDailyVote.isPending && candidateId) {
        // 일간/주간/월간 투표
        postDailyVote
          .mutateAsync({
            candidateId,
            count,
          })
          .then(response => {
            if (response.statusCode === 201) {
              refetch();
              onModalClose();
            }
          });
      } else {
        console.log(candidateId);
        console.log('잘못된 접근입니다.');
      }
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
          <VStack borderWidth={1}>
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

            <HStack w={200} mb={26}>
              <CenterButton
                borderTopLeftRadius={44}
                borderBottomLeftRadius={44}
                w={44}
                h={44}
                bgColor={colors.gray[40]}
                onPress={() => onCount(-1)}>
                <IconMinus14 />
              </CenterButton>

              <CustomInput
                containerStyle={{
                  width: 112,
                }}
                textAlign="center"
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
                bgColor={colors.gray[40]}
                onPress={() => onCount(1)}>
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
              onPress={onModalClose}>
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
