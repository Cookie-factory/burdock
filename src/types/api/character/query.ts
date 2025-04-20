import {CursorQuery} from '../common/query';

/**
 *@description 캐릭터 리스트 커서 요청 api query
 */
export type GetCharacterListQuery = {
  search?: string;
} & CursorQuery;
