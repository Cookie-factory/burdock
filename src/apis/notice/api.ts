import {CursorQuery} from '~/types/api/common/query';
import {apiCall} from '../common';
import {
  GetNoticeListResponse,
  GetNoticeResponse,
} from '~/types/api/notice/response';
import queryString from 'query-string';

/**
 *@description [공지사항 조회] api
 */
export const getNotice = (id: string) => {
  return apiCall<GetNoticeResponse>({
    method: 'GET',
    url: `notice/${id}`,
  });
};

/**
 *@description [공지사항 목록 조회] api
 */
export const getNoticeList = (query: CursorQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetNoticeListResponse>({
    method: 'GET',
    url: `notice?${_query}`,
  });
};
