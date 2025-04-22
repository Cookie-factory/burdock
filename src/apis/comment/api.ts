import queryString from 'query-string';
import {apiCall} from '../common';
import {GetCommentListQuery} from '~/types/api/comment/query';
import {GetCommentListResponse} from '~/types/api/comment/response';
import {PatchCommentData, PostCommentData} from '~/types/api/comment/data';
import {MutationResponse} from '~/types/api/common/response';

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

/**
 *@description 댓글 등록 api
 */
export const postComment = (data: PostCommentData) => {
  return apiCall<MutationResponse>({
    method: 'POST',
    url: `comment/${data.boardId}`,
    data,
  });
};

/**
 *@description 댓글 수정 api
 */
export const patchComment = (data: PatchCommentData) => {
  return apiCall<MutationResponse>({
    method: 'PATCH',
    url: `comment/${data.id}`,
    data: {
      content: data.content,
    },
  });
};

/**
 *@description 댓글 삭제 api
 */
export const deleteComment = (id: string) => {
  return apiCall<MutationResponse>({
    method: 'DELETE',
    url: `comment/${id}`,
  });
};
