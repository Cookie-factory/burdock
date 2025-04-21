export type CommentItem = {
  id: string;
  content: string;
  boardId: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  userId: string;
  isLike: boolean;
  _count: {
    commentLike: number;
  };
  user: {
    id: string;
    nickname: string;
    profile?: string;
  };
};

export type SelectedCommentType = {
  type: 'DEFAULT' | 'MODIFY' | 'DELETE';
} & Partial<CommentItem>;
