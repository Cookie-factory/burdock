import {FixedVoteDateFilter} from '.';

export type GetVoteRankQuery =
  | {
      voteSubjectTitle?: string;
      voteSubjectId: string;
      search?: string;
      take: number;
      date?: FixedVoteDateFilter;
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
      date?: FixedVoteDateFilter;
      cursor?: {
        totalVotes: number;
        candidateId: string;
      };
    };
