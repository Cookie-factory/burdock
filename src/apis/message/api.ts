import {GetMessageOnRoomResponse} from '~/types/api/message/response';
import {apiCall} from '../common';

export const getMessageOnRoom = (roomId?: string) => {
  return apiCall<GetMessageOnRoomResponse>({
    method: 'GET',
    url: `message/${roomId}`,
  });
};
