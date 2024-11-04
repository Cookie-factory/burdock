import {VoteType} from '.';

export type GetVoteRankQuery = {
  startDate?: string;
  endDate?: string;
  show?: number;
  voteType?: VoteType;
};
