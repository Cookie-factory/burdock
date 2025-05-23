import {ReportType} from './data';

/**
 *@description 선택되어진 신고 타겟 데이터
 */
export type SelectedReportData = {
  targetId: string; //
  targetType: ReportType;
  targetUserId: string;
};
