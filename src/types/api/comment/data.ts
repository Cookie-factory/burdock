/**
 *@description 댓글 등록 api 데이터
 */
export type PostCommentData = {
  content: string;
  boardId: string;
};

/**
 *@description 댓글 수정 api 데이터
 */
export type PatchCommentData = {
  content: string;
  id: string;
};
