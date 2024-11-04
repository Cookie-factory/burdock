import {MutationResponse} from '~/types/api/common/response';
import {apiCall} from '../common';
import {PostVoteData} from '~/types/api/vote/data';

/**
 *@description 투표 등록 api
 */
export const postVote = (data: PostVoteData) => {
  return apiCall<MutationResponse>({
    method: 'POST',
    url: 'vote',
    data,
  });
};
