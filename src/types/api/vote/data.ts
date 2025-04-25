/**
 *@description 투표 등록 api data
 */
export type PostVoteData = {
  candidateId: string;
  count: number;
  voteSubjectId: string;
};

/**
 *@description 일간 투표 등록 api data
 */
export type PostDailyVoteData = {
  candidateId: string;
  count: number;
};
