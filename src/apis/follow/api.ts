import {apiCall} from '../common';
import queryString from 'query-string';
import {GetFollowerListQuery} from '~/types/api/follow/query';
import {GetFollowListResponse} from '~/types/api/follow/response';

/**
 *@description follow on/off api
 */
export const patchFollow = (targetUserId: string) => {
  return apiCall({
    method: 'PATCH',
    url: `follow/${targetUserId}`,
  });
};

/**
 *@description get follower list api
 */
export const getFollowerList = (query: GetFollowerListQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetFollowListResponse>({
    method: 'GET',
    url: `follow/follower/${query.targetUserId}?${_query}`,
  });
};

/**
 *@description get following list api
 */
export const getFollowingList = (query: GetFollowerListQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetFollowListResponse>({
    method: 'GET',
    url: `follow/following/${query.targetUserId}?${_query}`,
  });
};
