import {useMutation, useQuery} from '@tanstack/react-query';
import {getVoteRank, postVote} from './api';
import {PostVoteData} from '~/types/api/vote/data';
import {queryKeys} from '~/constants/queryKeys';
import {GetVoteRankQuery} from '~/types/api/vote/query';

/**
 *@description [투표 등록] 훅
 */
export const usePostVote = () => {
  return useMutation({
    mutationFn: (data: PostVoteData) => postVote(data),
  });
};

/**
 *@description [투표 랭킹 조회] 훅
 */

export const useGetVoteRanking = (query: GetVoteRankQuery) => {
  return useQuery({
    queryKey: [queryKeys.vote.getVoteRank, query],
    queryFn: () => getVoteRank(query),
  });
};
