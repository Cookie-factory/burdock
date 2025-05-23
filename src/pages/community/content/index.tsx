import React, {useState} from 'react';
import {useGetAuthInfo} from '~/apis/auth/hook';
import {
  usePostBookmarkBoard,
  useGetBoard,
  usePostBoardLike,
} from '~/apis/board/hook';
import InnerLayout from '~/components/common/layout/InnerLayout';
import ScrollView from '~/components/common/scrollView/ScrollView';
import BigImageSwiper from '~/components/common/swiper/BigImageSwiper';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import CommentList from '~/components/community/content/comment/CommentList';
import ContentHelperView from '~/components/community/content/ContentHelperView';
import ContentText from '~/components/community/content/ContentText';
import ContentTitle from '~/components/community/content/ContentTitle';
import ContentTopView from '~/components/community/content/ContentTopView';
import ReportModal from '~/components/report/ReportModal';
import useFocusScreen from '~/hooks/navigator/useFocusScreen';
import useNavigate from '~/hooks/navigator/useNavigation';
import useParam from '~/hooks/navigator/useParam';
import {SelectedReportData} from '~/types/api/report';

/**
 *@description 게시글 내용 페이지
 */
function CommunityContent() {
  const {navigate, goBack} = useNavigate();

  const param = useParam('CommunityContent');

  const {data, refetch} = useGetBoard({id: param?.id});
  const {data: userData} = useGetAuthInfo();

  const {mutateAsync: bookmarkBoardMutate} = usePostBookmarkBoard();
  const {mutateAsync: postBoardLike} = usePostBoardLike();
  const [selectedReport, setSelectedReport] =
    useState<SelectedReportData | null>(null);
  const [isShowReportPopup, setShowReportPopup] = useState(false);

  const onLike = () => {
    if (param?.id) {
      postBoardLike(param.id).then(response => {
        if (response.statusCode === 201) {
          refetch();
        }
      });
    }
  };

  /**
   *@description 신고 버튼 클릭 이벤트
   */
  const onReportButtonClick = (_selectedReportData: SelectedReportData) => {
    setSelectedReport(_selectedReportData);
    setShowReportPopup(true);
  };

  const onBookmark = () => {
    if (param?.id) {
      bookmarkBoardMutate(param?.id).then(response => {
        if (response.statusCode === 201) {
          refetch();
        }
      });
    }
  };

  useFocusScreen(() => {
    refetch();
  });

  return (
    <WhiteSafeAreaView>
      <ScrollView>
        <VStack flex={1} pt={20}>
          <ContentTopView
            boardId={data?.data.id}
            authorData={data?.data.author}
            userId={userData?.data.id}
            onReportButtonClick={onReportButtonClick}
          />

          <BigImageSwiper images={data?.data.images ?? []} />

          <InnerLayout>
            <ContentHelperView
              onBookmark={onBookmark}
              boardInfoCount={data?.data._count}
              updatedAt={data?.data.updatedAt}
              isBookmark={data?.data.isBookmark}
              onLike={onLike}
              isLike={data?.data.isLike}
            />

            <ContentTitle title={data?.data.title ?? ''} />

            <ContentText content={data?.data.content ?? ''} />

            <CommentList boardId={param?.id} />
          </InnerLayout>
        </VStack>
      </ScrollView>

      <ReportModal
        isOpen={isShowReportPopup}
        onClose={() => setShowReportPopup(false)}
        selectedReport={selectedReport}
      />
    </WhiteSafeAreaView>
  );
}

export default CommunityContent;
