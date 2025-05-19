import {GetUserInfoResponse} from '~/types/api/user/response';
import {apiCall} from '../common';

/**
 *@description 특정 유저 정보 조회 api
 */
export const getUserInfo = (targetUserId?: string) => {
  return apiCall<GetUserInfoResponse>({
    url: `user/${targetUserId}`,
  });
};
