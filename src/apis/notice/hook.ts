import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '~/constants/queryKeys';
import {getNotice, getNoticeList} from './api';
import {CursorQuery} from '~/types/api/common/query';

/**
 *@description [공지사항 조회] 훅
 */
export const useGetNotice = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.notice.getNotice],
    queryFn: () => getNotice(id),
  });
};

/**
 *@description [공지사항 목록 조회] 훅
 */
export const useGetNoticeList = (query: CursorQuery) => {
  return useQuery({
    queryKey: [queryKeys.notice.getNotice, query],
    queryFn: () => getNoticeList(query),
  });
};
