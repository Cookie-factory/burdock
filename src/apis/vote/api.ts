import {MutationResponse} from '~/types/api/common/response';
import {apiCall} from '../common';
import {PostDailyVoteData, PostVoteData} from '~/types/api/vote/data';
import {GetVoteRankQuery} from '~/types/api/vote/query';
import queryString from 'query-string';
import {GetRankVoteResponse} from '~/types/api/vote/response';

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

/**
 *@description 일간 투표 등록 api
 */
export const postDailyVote = (data: PostDailyVoteData) => {
  return apiCall<MutationResponse>({
    method: 'POST',
    url: 'vote/daily',
    data,
  });
};

/**
 *@description 투표 랭킹 조회 api
 */
export const getVoteRank = (query: GetVoteRankQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetRankVoteResponse>({
    method: 'GET',
    url: `vote/rank?${_query}`,
  });
};
