/**
 *@description 댓글 등록 api 데이터
 */
export type PostCommentData = {
  content: string;
  boardId: string;
  parentId?: string; // 부모 댓글(답글일때)
  targetUserId?: string; // 답글일 때, 대상 댓글
};

/**
 *@description 댓글 수정 api 데이터
 */
export type PatchCommentData = {
  content: string;
  id: string;
};
