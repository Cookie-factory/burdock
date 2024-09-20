export type BoardItem = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    nickname: string;
  };
};
