import {PostReportData} from '~/types/api/report/data';
import {apiCall} from '../common';
import {MutationResponse} from '~/types/api/common/response';

/**
 *@description 신고하기 api
 */
export const postReport = (data: PostReportData) => {
  return apiCall<MutationResponse>({
    method: 'POST',
    url: 'report',
    data,
  });
};
