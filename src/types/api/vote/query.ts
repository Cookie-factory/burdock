import {VoteType} from '.';

export type GetVoteRankQuery =
  | {
      voteSubjectTitle?: string;
      voteSubjectId: string;
      search?: string;
      take: number;
      cursor?: {
        totalVotes: number;
        candidateId: string;
      };
    }
  | {
      voteSubjectTitle: string;
      voteSubjectId?: string;
      search?: string;
      take: number;
      cursor?: {
        totalVotes: number;
        candidateId: string;
      };
    };
