import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {getFollowerList, getFollowingList, patchFollow} from './api';
import {queryKeys} from '~/constants/queryKeys';
import {CursorQuery} from '~/types/api/common/query';
import {GetFollowerListQuery} from '~/types/api/follow/query';

/**
 *@description follow on/off hook
 */

export const usePatchFollow = () => {
  return useMutation({
    mutationFn: (targetUserId: string) => patchFollow(targetUserId),
  });
};

/**
 *@description get follower list hook
 */
export const useGetFollowerList = (query: GetFollowerListQuery) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.follow.getFollowerList,
      query.targetUserId,
      query.search,
    ],
    queryFn: ({pageParam}) => getFollowerList(pageParam),

    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          cursor: previousData.reverse()[0].id,
          take: lastPageParam.take,
          targetUserId: lastPageParam.targetUserId,
        } as GetFollowerListQuery;
      } else {
        return null;
      }
    },
    select: data => ({
      pages: data.pages.flatMap(page => page.data),
      pageParams: data.pageParams,
    }),
  });
};

/**
 *@description get following list hook
 */
export const useGetFollowingList = (query: GetFollowerListQuery) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.follow.getFollowingList,
      query.targetUserId,
      query.search,
    ],
    queryFn: ({pageParam}) => getFollowingList(pageParam),

    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          cursor: previousData.reverse()[0].id,
          take: lastPageParam.take,
          targetUserId: lastPageParam.targetUserId,
        } as GetFollowerListQuery;
      } else {
        return null;
      }
    },
    select: data => ({
      pages: data.pages.flatMap(page => page.data),
      pageParams: data.pageParams,
    }),
  });
};
