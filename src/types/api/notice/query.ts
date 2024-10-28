import {CursorQuery} from '../common/query';

export type GetNoticeQuery = CursorQuery & {
  type: 'NOTICE' | 'EVENT';
};
