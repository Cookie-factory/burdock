import React, {useState} from 'react';
import CustomText from '~/components/common/text/Text';
import HStack from '~/components/common/view/HStack';
import IconMore24 from '~/assets/icons/IconMore24.svg';
import CenterButton from '~/components/common/button/CenterButton';
import {colors} from '~/constants/style';
import Image from '~/components/common/image/Image';
import WritingKebabMenu from '~/components/common/kebab/WritingKebabMenu';
import {useDeleteBoard, useGetBoardList} from '~/apis/board/hook';
import useNavigate from '~/hooks/navigator/useNavigation';
import useToastShow from '~/hooks/toast/useToastShow';
import Popup from '~/components/common/popup/Popup';
import {toastText} from '~/constants/text';
import {usePostBlock} from '~/apis/block/hook';
import BlockPopup from '~/components/menu/block/BlockPopup';
import {SelectedReportData} from '~/types/api/report';

interface Props {
  authorData?: {
    id: string;
    nickname: string;
    profile?: string;
  };
  userId?: string;
  boardId?: string;

  onReportButtonClick: (_selectedReportData: SelectedReportData) => void;
}

/**
 *@description 게시글 상단 -> 유저, 추가 기능 버튼 뷰
 */
function ContentTopView({
  authorData,
  userId,
  boardId,
  onReportButtonClick,
}: Props) {
  const {navigate, goBack} = useNavigate();
  const {onShowToast} = useToastShow();
  const {refetch: getBoardListRefetch} = useGetBoardList({
    cursor: null,
    take: 20,
  });

  const isAuthor = userId && authorData ? userId === authorData?.id : false;
  const [isWritingKebabMenuOpen, setWritingKebabMenuOpen] = useState(false);
  const deleteBoard = useDeleteBoard();
  const [isShowDeletePopup, setShowDeletePopup] = useState(false);
  const [isShowBlockPopup, setShowBlockPopup] = useState(false);

  const {mutateAsync: postBlockMutate} = usePostBlock();

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
        getBoardListRefetch();
        goBack();
      }
    });
  };

  /**
   *@description 유저 차단하기
   */
  const onBlock = (targetUserNickname?: string, targetUserId?: string) => {
    if (!targetUserId || !targetUserNickname) {
      return onShowToast({
        text1: toastText.error.wrongApproach,
      });
    }

    postBlockMutate(targetUserId).then(response => {
      if (response.statusCode === 201) {
        onShowToast({text1: `${targetUserNickname}을 차단하였습니다.`});
        setShowBlockPopup(false);
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
      if (authorData?.id) {
        postBlockMutate(authorData?.id).then(response => {
          if (response.statusCode === 201) {
            onShowToast({
              text1: `${authorData.nickname}님이 차단되었습니다.`,
              text2:
                '차단 해제는 메뉴 -> 차단 유저 리스트에서 해제 가능합니다.',
            });

            setWritingKebabMenuOpen(false);
          }
        });
      } else {
        onShowToast({
          text1: toastText.error.wrongApproach,
        });
      }
    }
  };

  const onSecondPress = () => {
    if (isAuthor) {
      setWritingKebabMenuOpen(false);
      setTimeout(() => setShowDeletePopup(true), 150);
    } else {
      // 신고
      if (!boardId || !authorData?.id) {
        onShowToast({text1: toastText.error.wrongApproach});
        return;
      }

      onReportButtonClick({
        targetId: boardId,
        targetType: 'BOARD',
        targetUserId: authorData?.id,
      });
    }
  };

  const onMoveUserInfoPage = () => {
    if (authorData?.id) {
      navigate('UserInfo', {
        targetUserId: authorData?.id,
      });
    }
  };

  return (
    <HStack justifyContent="space-between" px={20} py={8}>
      <HStack w="auto">
        <CenterButton onPress={onMoveUserInfoPage} w={28} h={28}>
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
            }}
          />
        </CenterButton>

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

      <BlockPopup
        isOpen={isShowBlockPopup}
        onClose={() => setShowBlockPopup(false)}
        onOkPress={() => onBlock(authorData?.nickname, authorData?.id)}
        onCancelPress={() => setShowBlockPopup(false)}
      />

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
