// 서버 에러 응답 타입
export interface ErrorResponse {
  message: string | string[];
  statusCode: number;
  path: string;
  data: object;
}

export interface ErrorData<T = undefined> {
  message: string;
  statusCode: number;
  data: T;
}

/**
 *@description api 쿼리 => id 프로퍼티
 */
export type IDQuery = {
  id?: string;
};

/**
 *@description api 응답 => id 프로퍼티
 */
export type IDResponse = {
  id: string;
};
