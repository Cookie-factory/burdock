import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {
  getMyRemainVoteCount,
  getRanking3PerThemes,
  getVoteRank,
  getVoteSubjectList,
  postDailyVote,
  postVote,
} from './api';
import {PostDailyVoteData, PostVoteData} from '~/types/api/vote/data';
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
 *@description [일간 투표 등록] 훅
 */
export const usePostDailyVote = () => {
  return useMutation({
    mutationFn: (data: PostDailyVoteData) => postDailyVote(data),
  });
};

/**
 *@description [투표 랭킹 조회] 훅
 */
export const useGetVoteRanking = (query: GetVoteRankQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.vote.getVoteRank, query],
    queryFn: ({pageParam}) => getVoteRank(pageParam ?? query),
    initialPageParam: query,
    getNextPageParam: lastPage => {
      return lastPage?.data.nextCursor
        ? {
            ...query,
            cursor: lastPage.data.nextCursor,
          }
        : null;
    },
    select: data => ({
      pages: data.pages.flatMap(page => page.data.items),
      pageParams: data.pageParams,
      subjectInfo: data.pages[0].data?.subjectInfo,
      totalVotesOfSubject: data.pages[0].data?.totalVotesOfSubject,
    }),
  });
};

/**
 *@description [투표 주제 목록 조회] 훅
 */
export const useGetVoteSubjectList = () => {
  return useQuery({
    queryKey: [queryKeys.vote.getVoteSubjectList],
    queryFn: () => getVoteSubjectList(),
  });
};

/**
 *@description [테마별 탑 3 랭킹 조회] 훅
 */
export const useGetRanking3PerThemes = () => {
  return useQuery({
    queryKey: [queryKeys.vote.getRanking3PerThemes],
    queryFn: () => getRanking3PerThemes(),
  });
};

export const useGetMyRemainVoteCount = () => {
  return useQuery({
    queryKey: [queryKeys.vote.getMyRemainVoteCount],
    queryFn: () => getMyRemainVoteCount(),
  });
};
