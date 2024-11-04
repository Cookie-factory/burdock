import {apiCall} from '../common';
import queryString from 'query-string';
import {GetCelebrityListQuery} from '~/types/api/celebrity/query';
import {GetCelebrityListResponse} from '~/types/api/celebrity/response';

/**
 *@description 유명 인사 리스트 조회 api
 */
export const getCelebrityList = (query: GetCelebrityListQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetCelebrityListResponse>({
    method: 'GET',
    url: `celebrity?${_query}`,
  });
};
