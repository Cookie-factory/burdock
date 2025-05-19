import {useQuery} from '@tanstack/react-query';
import {getUserInfo} from './api';
import {queryKeys} from '~/constants/queryKeys';

/**
 *@description 특정 유저 정보 조회 hook
 */
export const useGetUserInfo = (targetUserId?: string) => {
  return useQuery({
    queryKey: [queryKeys.user.getUserInfo, targetUserId],
    queryFn: () => getUserInfo(targetUserId),
    enabled: !!targetUserId,
  });
};
