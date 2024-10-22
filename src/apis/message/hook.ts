import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '~/constants/queryKeys';
import {getMessageOnRoom} from './api';
import _ from 'lodash';

export const useGetMessageOnRoom = (roomId?: string) => {
  return useQuery({
    queryKey: [queryKeys.message.getMessageOnRoom],
    queryFn: () => getMessageOnRoom(roomId),
    enabled: false,
  });
};
