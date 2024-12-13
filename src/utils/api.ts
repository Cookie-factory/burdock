import {ErrorData} from '~/types/api/common';

/**
 *@description api error 인지 확인 함수, 반환값이 true이면 error을 ErrorResponse로 타입 좁힘
 */
export function isApiErrorWithMessage(error: any): error is ErrorData {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}
