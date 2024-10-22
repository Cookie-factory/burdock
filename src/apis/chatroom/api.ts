import {GetChatroomListQuery} from '~/types/api/chatroom/query';
import {apiCall} from '../common';
import {GetChatroomListResponse} from '~/types/api/chatroom/response';

export const getChatroomList = (query: GetChatroomListQuery) => {
  return apiCall<GetChatroomListResponse>({
    method: 'GET',
    url: `chat-room/list?type=${query.type}`,
  });
};
