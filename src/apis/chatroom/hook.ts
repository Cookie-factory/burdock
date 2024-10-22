import {useQuery} from '@tanstack/react-query';
import {getChatroomList} from './api';
import {queryKeys} from '~/constants/queryKeys';
import {GetChatroomListQuery} from '~/types/api/chatroom/query';

export const useGetChatroomList = (query: GetChatroomListQuery) => {
  return useQuery({
    queryKey: [queryKeys.chatroom.getChatroomList],
    queryFn: () => getChatroomList(query),
  });
};
