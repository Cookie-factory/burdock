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
  imgUrl?: string;
  topCandidates: {
    character: {characterSource: {name: string}; name: string; profile: string};
    id: string;
    totalVotes: number;
  }[];
};

/**
 *@description 내 투표 이력 항목 타입
 */
export type VoteMyHistoryItem = {
  id: string;
  count: number;
  createdAt: string;
  candidate: {
    id: string;
    character: {
      id: string;
      name: string;
      profile: string;
    };
  };
  voteSubject: {id: string; title: string};
};
