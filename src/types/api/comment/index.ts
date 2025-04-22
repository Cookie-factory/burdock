export type CommentItem = {
  id: string;
  content: string;
  boardId: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  userId: string;
  parentId?: string;
  isLike: boolean;
  _count: {
    commentLike: number;
  };
  user: {
    id: string;
    nickname: string;
    profile?: string;
  };
  targetUser?: {
    nickname: string;
  };
  recomment: CommentItem[];
  isAuth: boolean;
};

export type SelectedCommentType = {
  targetUserId?: string;
  type: 'DEFAULT' | 'MODIFY' | 'DELETE' | 'RECOMMENT';
} & Partial<CommentItem>;
