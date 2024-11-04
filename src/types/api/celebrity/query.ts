import {CursorQuery} from '../common/query';

/**
 *@description 유명인사 리스트 커서 요청 api query
 */
export type GetCelebrityListQuery = {
  category: 'YOUTUBE' | 'INSTAGRAM' | 'AFRICATV' | 'TIKTOK';
  search?: string;
} & CursorQuery;
