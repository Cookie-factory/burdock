import {Ranking3PerThemesItem, RankVoteItem, VoteMyHistoryItem} from '.';

export type GetRankVoteResponse = {
  items: RankVoteItem[];
  nextCursor: {
    totalVotes: number;
    candidateId: string;
  } | null;
  totalVotesOfSubject: number;
  subjectInfo: {
    title: string;
    description: string;
    endAt: string | null;
  };
};

export type GetVoteSubjectListResponse = any[];

export type GetRanking3PerThemesResponse = Ranking3PerThemesItem[];

/**
 *@description 본인 투표 히스토리 조회 api 응답
 */
export type GetVoteMyHistoryResponse = VoteMyHistoryItem[];
