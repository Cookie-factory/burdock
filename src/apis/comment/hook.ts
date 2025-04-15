import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {getCommentList, postCommentLike} from './api';
import {GetCommentListQuery} from '~/types/api/comment/query';
import {queryKeys} from '~/constants/queryKeys';

/**
 *@description 댓글 리스트 훅
 */
export const useGetCommentList = (query: GetCommentListQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.comment.getCommentList, query],
    queryFn: ({pageParam}) => getCommentList(pageParam),
    initialPageParam: query,
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
