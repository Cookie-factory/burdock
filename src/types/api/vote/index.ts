export type VoteType = 'DAILY_FAMOUS';

export type RankVoteItem = {
  celebrityId: string;
  celebrityName: string;
  totalVotes: number;
};

// 고정 투표 성별 필터
export type FixedVoteGenderFilter = 'total' | 'woman' | 'man' | 'nogender';

export type FixedVoteDateFilter = 'daily' | 'weekly' | 'monthly';
