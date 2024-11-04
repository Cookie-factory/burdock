import {useMutation} from '@tanstack/react-query';
import {postVote} from './api';
import {PostVoteData} from '~/types/api/vote/data';

/**
 *@description [투표 등록] 훅
 */
export const usePostVote = () => {
  return useMutation({
    mutationFn: (data: PostVoteData) => postVote(data),
  });
};
