import queryString from 'query-string';
import {apiCall} from '../common';
import {GetCommentListQuery} from '~/types/api/comment/query';
import {GetCommentListResponse} from '~/types/api/comment/response';

/**
 *@description 댓글 리스트 api 조회
 */
export const getCommentList = (query: GetCommentListQuery) => {
  const _query = queryString.stringify({...query});
  return apiCall<GetCommentListResponse>({
    method: 'GET',
    url: `comment?${_query}`,
  });
};

/**
 *@description 댓글 좋아요 api
 */
export const postCommentLike = (commentId: string) => {
  return apiCall<{commentLike: boolean}>({
    method: 'POST',
    url: 'comment-like',
    data: {commentId},
  });
};
