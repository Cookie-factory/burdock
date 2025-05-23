import {useMutation} from '@tanstack/react-query';
import {postReport} from './api';
import {PostReportData} from '~/types/api/report/data';

/**
 *@description 유저 신고하기 hook
 */
export const usePostReport = () => {
  return useMutation({
    mutationFn: (data: PostReportData) => postReport(data),
  });
};
