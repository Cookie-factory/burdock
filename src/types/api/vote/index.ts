export type VoteType = 'DAILY_FAMOUS';

export type RankVoteItem = {
  id: string;
  totalVotes: number;
  name: string;
  sourceName: string;
  rank: number;
  profile: string;
};

// 고정 투표 성별 필터
export type FixedVoteGenderFilter = 'total' | 'woman' | 'man' | 'nogender';

export type FixedVoteDateFilter = '일간' | '주간' | '월간';
