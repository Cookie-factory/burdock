import {apiCall} from '../common';
import queryString from 'query-string';
import {GetCharacterListQuery} from '~/types/api/character/query';
import {GetCharacterListResponse} from '~/types/api/character/response';

/**
 *@description 캐릭터 리스트 조회 api
 */
export const getCharacterList = (query: GetCharacterListQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetCharacterListResponse>({
    method: 'GET',
    url: `character?${_query}`,
  });
};
