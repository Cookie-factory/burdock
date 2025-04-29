import {Ranking3PerThemesItem, RankVoteItem} from '.';

export type GetRankVoteResponse = {
  items: RankVoteItem[];
  nextCursor: {
    totalVotes: number;
    candidateId: string;
  } | null;
  title: string;
  subjectInfo: {
    title: string;
    description: string;
    endAt: string | null;
  };
};

export type GetVoteSubjectListResponse = any[];

export type GetRanking3PerThemesResponse = Ranking3PerThemesItem[];
