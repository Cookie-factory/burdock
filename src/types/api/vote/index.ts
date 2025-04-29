export type RankVoteItem = {
  id: string;
  totalVotes: number;
  name: string;
  sourceName: string;
  rank: number;
  profile: string;
  voteSubjectId: string;
};

// 고정 투표 성별 필터
export type FixedVoteGenderFilter = 'total' | 'woman' | 'man' | 'nogender';

export type FixedVoteDateFilter = 'day' | 'week' | 'month';

export type Ranking3PerThemesItem = {
  endAt: string;
  id: string;
  title: string;
  description: string;
  topCandidates: {
    character: {characterSource: {name: string}; name: string; profile: string};
    id: string;
    totalVotes: number;
  }[];
};
