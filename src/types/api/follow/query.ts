import {CursorQuery} from '../common/query';

export type GetFollowerListQuery = CursorQuery & {
  targetUserId: string;
  search?: string;
};
