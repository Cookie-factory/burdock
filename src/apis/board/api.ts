import {GetBoardListQuery} from '~/types/api/board/query';
import {apiCall} from '../common';
import queryString from 'query-string';
import {GetBoardListResopnse} from '~/types/api/board/response';
import {PostBoardData} from '~/types/api/board/data';
import {IDQuery, IDResponse} from '~/types/api/common';
import {BoardItem} from '~/types/api/board';

/**
 *@description 게시글 리스트 조회 api
 */
export const getBoardList = (query: GetBoardListQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetBoardListResopnse>({
    method: 'GET',
    url: `board?${_query}`,
  });
};

/**
 *@description 게시글 등록 api
 */
export const postBoard = (data: PostBoardData) => {
  return apiCall({
    method: 'POST',
    url: 'board',
    data,
  });
};

/**
 *@description 게시글 내용 조회 api
 */

export const getBoard = (query: IDQuery) => {
  return apiCall<BoardItem>({
    method: 'GET',
    url: `board/${query.id}`,
  });
};

/**
 *@description 게시글 삭제 api
 */
export const deleteBoard = (query: IDQuery) => {
  return apiCall<IDResponse>({
    method: 'DELETE',
    url: `board/${query.id}`,
  });
};

/**
 *@description 게시글 수정 api
 */
export const patchBoard = (query: IDQuery, data: Partial<PostBoardData>) => {
  return apiCall<IDResponse>({
    method: 'PATCH',
    url: `board/${query.id}`,
    data,
  });
};
