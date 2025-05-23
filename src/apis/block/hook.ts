import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {getBlockedUserList, postBlock} from './api';
import {queryKeys} from '~/constants/queryKeys';
import {CursorQuery} from '~/types/api/common/query';

/**
 *@description block on/off hook
 */
export const usePostBlock = () => {
  return useMutation({
    mutationFn: (blockedId: string) => postBlock(blockedId),
  });
};

/**
 *@description 내가 차단한 유저 리스트 hook
 */
export const useGetBlockedUserList = (query: CursorQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.vote.getVoteRank, query],
    queryFn: ({pageParam}) => getBlockedUserList(pageParam ?? query),
    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          cursor: previousData.reverse()[0].id,
          take: lastPageParam.take,
        } as CursorQuery;
      } else {
        return null;
      }
    },
  });
};
