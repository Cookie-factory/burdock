export type BoardInfoCount = {
  bookmark: number;
  comment: number;
  like: number;
};

export type BoardItem = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  isBookmark: boolean;
  isLike: boolean;
  author: {
    id: string;
    nickname: string;
    profile?: string;
  };
  _count: BoardInfoCount;
  character: {
    id: string;
    name: string;
  }[];
};
