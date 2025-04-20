import {useInfiniteQuery} from '@tanstack/react-query';
import {getCharacterList} from './api';
import {queryKeys} from '~/constants/queryKeys';
import {GetCharacterListQuery} from '~/types/api/character/query';

/**
 *@description 캐릭터 리스트 조회 api 훅
 */
export const useGetCharacterList = (query: GetCharacterListQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.character.getCharacterList, query],
    queryFn: ({pageParam}) => getCharacterList(pageParam),
    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          ...lastPageParam,
          cursor: previousData.reverse()[0].id,
        } as GetCharacterListQuery;
      } else {
        return null;
      }
    },
  });
};
