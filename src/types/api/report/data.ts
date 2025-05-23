export type ReportType = 'USER' | 'BOARD' | 'COMMENT';

/**
 *@description 신고하기 데이터
 */
export type PostReportData = {
  reason?: string;
  targetId: string;
  type: ReportType;
  targetUserId: string;
};
