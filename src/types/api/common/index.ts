// 서버 에러 응답 타입
export interface ErrorResponse {
  message: string | string[];
  statusCode: number;
  path: string;
}
