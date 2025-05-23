import {apiCall} from '~/apis/common';
import queryString from 'query-string';
import {CursorQuery} from '~/types/api/common/query';
import {GetBlockedUserListResponse} from '~/types/api/block/response';

/**
 *@description 유저 block on/off api
 */
export const postBlock = (blockedId: string) => {
  return apiCall<{isBlock: boolean}>({
    method: 'POST',
    url: 'block',
    data: {
      blockedId,
    },
  });
};

/**
 *@description 내가 차단한 유저 리스트 조회 api
 */
export const getBlockedUserList = (query: CursorQuery) => {
  const _query = queryString.stringify({...query});

  return apiCall<GetBlockedUserListResponse>({
    method: 'GET',
    url: `block/blockedUserList?${_query}`,
  });
};
