import {NoticeItem} from '.';

export type GetNoticeResponse = {
  title: string;
  content: string;
  createdAt: string;
};

export type GetNoticeListResponse = NoticeItem[];
