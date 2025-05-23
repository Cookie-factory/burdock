import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {
  getMyRemainVoteCount,
  getRanking3PerThemes,
  getVoteMyHistory,
  getVoteRank,
  getVoteSubjectList,
  postDailyVote,
  postVote,
} from './api';
import {PostDailyVoteData, PostVoteData} from '~/types/api/vote/data';
import {queryKeys} from '~/constants/queryKeys';
import {GetVoteRankQuery} from '~/types/api/vote/query';
import {CursorQuery} from '~/types/api/common/query';

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

/**
 *@description 본인 남아있는 투표 수 조회 훅
 */
export const useGetMyRemainVoteCount = () => {
  return useQuery({
    queryKey: [queryKeys.vote.getMyRemainVoteCount],
    queryFn: () => getMyRemainVoteCount(),
  });
};

/**
 *@description 자기 투표 히스토리 조회 훅
 */
export const useGetVoteMyHistory = (query: CursorQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.vote.getVoteMyHistory, query],
    queryFn: ({pageParam}) => getVoteMyHistory(pageParam),
    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          ...lastPageParam,
          cursor: previousData.reverse()[0].id,
        } as CursorQuery;
      } else {
        return null;
      }
    },
  });
};
