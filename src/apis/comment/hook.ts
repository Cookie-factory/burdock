import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {
  deleteComment,
  getCommentList,
  patchComment,
  postComment,
  postCommentLike,
} from './api';
import {GetCommentListQuery} from '~/types/api/comment/query';
import {queryKeys} from '~/constants/queryKeys';
import {PatchCommentData, PostCommentData} from '~/types/api/comment/data';

/**
 *@description 댓글 리스트 훅
 */
export const useGetCommentList = (query: GetCommentListQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.comment.getCommentList, query],
    queryFn: ({pageParam}) => getCommentList(pageParam),
    initialPageParam: query,
    enabled: !!query.boardId,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          cursor: previousData.reverse()[0].id,
          take: lastPageParam.take,
        } as GetCommentListQuery;
      } else {
        return null;
      }
    },
  });
};

/**
 *@description 댓글 좋아요 훅
 */
export const usePostCommentLike = () => {
  return useMutation({
    mutationFn: (commentId: string) => postCommentLike(commentId),
  });
};

/**
 *@description 댓글 등록 훅
 */
export const usePostComment = () => {
  return useMutation({
    mutationFn: (data: PostCommentData) => postComment(data),
  });
};

/**
 *@description 댓글 수정 훅
 */
export const usePatchComment = () => {
  return useMutation({
    mutationFn: (data: PatchCommentData) => patchComment(data),
  });
};

/**
 *@description 댓글 삭제 훅
 */
export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
  });
};
