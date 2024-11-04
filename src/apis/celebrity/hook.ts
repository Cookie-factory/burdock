import {useInfiniteQuery} from '@tanstack/react-query';
import {getCelebrityList} from './api';
import {queryKeys} from '~/constants/queryKeys';
import {GetCelebrityListQuery} from '~/types/api/celebrity/query';

/**
 *@description 유명인사 리스트 조회 api 훅
 */
export const useGetCelebrityList = (query: GetCelebrityListQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.celebrity.getCelebrityList, query],
    queryFn: ({pageParam}) => getCelebrityList(pageParam),
    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          ...lastPageParam,
          cursor: previousData.reverse()[0].id,
        } as GetCelebrityListQuery;
      } else {
        return null;
      }
    },
  });
};
