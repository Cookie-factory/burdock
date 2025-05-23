import React, {useState} from 'react';
import CustomModal from '~/components/common/modal/Modal';
import CustomModalContent from '~/components/common/modal/ModalContent';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import {APP_WIDTH} from '~/utils/dimension';
import FormInput from '../common/input/FormInput';
import ActiveButton from '../common/button/ActiveButton';
import {usePostReport} from '~/apis/report/hook';
import useToastShow from '~/hooks/toast/useToastShow';
import {SelectedReportData} from '~/types/api/report';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedReport: SelectedReportData | null;
}

/**
 *@description 신고 모달
 */
function ReportModal({isOpen, onClose, selectedReport}: Props) {
  const [reason, setReason] = useState('');
  const {mutateAsync: postReportMutate} = usePostReport();
  const {onShowToast} = useToastShow();

  /**
   *@description 신고하기 api 실행 이벤트
   */
  const onReport = () => {
    if (!selectedReport) return;

    postReportMutate({
      reason,
      targetId: selectedReport.targetId,
      type: selectedReport.targetType,
      targetUserId: selectedReport.targetUserId,
    }).then(response => {
      if (response.statusCode === 201) {
        onShowToast({text1: '신고되었습니다.'});
        onClose();
      }
    });
  };

  return (
    <CustomModal
      isVisible={isOpen}
      onDismiss={onClose}
      justifyContent="center"
      alignItems="center">
      <CustomModalContent borderWidth={1} w={APP_WIDTH - 40} h={340} py={30}>
        <VStack flex={1}>
          <VStack pl={12} mb={20} alignItems="flex-start">
            <CustomText fontSize={14}>신고하기 사유</CustomText>
          </VStack>

          <FormInput
            minH={140}
            onChangeText={setReason}
            value={reason}
            multiline
          />

          <ActiveButton
            mt={24}
            onPress={onReport}
            text={'신고하기'}
            buttonType={'red'}
          />
        </VStack>
      </CustomModalContent>
    </CustomModal>
  );
}

export default ReportModal;
