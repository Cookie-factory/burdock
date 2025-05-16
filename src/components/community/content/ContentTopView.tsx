import React, {useState} from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import IconMore24 from '~/assets/icons/IconMore24.svg';
import CenterButton from '~/components/common/button/CenterButton';
import {colors} from '~/constants/style';
import Image from '~/components/common/image/Image';
import WritingKebabMenu from '~/components/common/kebab/WritingKebabMenu';
import {useDeleteBoard} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import useToastShow from '~/hooks/toast/useToastShow';
import Popup from '~/components/common/popup/Popup';

interface Props {
  authorData?: {
    id: string;
    nickname: string;
    profile?: string;
  };
  userId?: string;
  boardId?: string;
}

/**
 *@description 게시글 상단 -> 유저, 추가 기능 버튼 뷰
 */
function ContentTopView({authorData, userId, boardId}: Props) {
  const {navigate, goBack} = useNavigate();
  const {onShowToast} = useToastShow();

  const isAuthor = userId && authorData ? userId === authorData?.id : false;
  const [isWritingKebabMenuOpen, setWritingKebabMenuOpen] = useState(false);
  const deleteBoard = useDeleteBoard();
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);

  const onDelete = () => {
    if (!boardId) {
      onShowToast({
        text1: '잘못된 접근입니다.',
      });
      return;
    }

    deleteBoard.mutateAsync({id: boardId}).then(response => {
      if (response.statusCode === 200) {
        onShowToast({
          text1: '게시글이 삭제되었습니다.',
        });

        goBack();
      }
    });
  };

  const onMoveModifyPage = () => {
    if (!boardId) {
      onShowToast({
        text1: '잘못된 접근입니다.',
      });
      return;
    }

    navigate('CommunityRegister', {
      id: boardId,
    });
  };

  const onFirstPress = () => {
    if (isAuthor) {
      setWritingKebabMenuOpen(false);
      onMoveModifyPage();
    } else {
      // 차단
    }
  };

  const onSecondPress = () => {
    if (isAuthor) {
      setWritingKebabMenuOpen(false);
      setTimeout(() => setShowDeletePopup(true), 150);
    } else {
      // 신고
    }
  };

  return (
    <HStack justifyContent="space-between" px={20} py={8}>
      <HStack w="auto">
        <Image
          borderWidth={1}
          borderColor={colors.gray[30]}
          w={28}
          h={28}
          mr={15}
          bgColor={colors.gray[60]}
          borderRadius={28}
          source={{
            uri: authorData?.profile ?? '',
            // uri: 'https://i.namu.wiki/i/Q--xh7Fdq_iGi_wFeW0v2FqiN11HrWHPDiLADLPZXL0dqlNwmVGIj6U-FQwhCyurszC9TXO6WXfhlXa1Nb06E-k6F3kYyA91mpFZ35mHyg2N8MHS9Y4NCkJ-pgfdb3jmj1hYpIk-bLNlQtfWjOSCOg.webp',
          }}
        />

        <CustomText fontWeight={'bold'} fontSize={10}>
          {authorData?.nickname ?? ''}
        </CustomText>
      </HStack>

      <CenterButton
        w={38}
        h={38}
        // onPress={() => setShowDeletePopup(true)}
        onPress={() => setWritingKebabMenuOpen(true)}>
        <IconMore24 />
      </CenterButton>

      <Popup
        isOpen={isShowDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onOkPress={onDelete}
        onCancelPress={() => setShowDeletePopup(false)}
        okText={'삭제'}
        cancelText={'취소'}
        title={'삭제하시겠습니까?'}
      />

      <WritingKebabMenu
        isOpen={isWritingKebabMenuOpen}
        onClose={() => setWritingKebabMenuOpen(false)}
        isAuthor={isAuthor}
        onFirstPress={onFirstPress}
        onSecondPress={onSecondPress}
      />
    </HStack>
  );
}

export default ContentTopView;
