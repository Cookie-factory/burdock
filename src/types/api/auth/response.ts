/**
 *@description 이메일 로그인 api 응답
 */
export interface PostLoginResponse {
  access: string;
  refresh: string;
}

/**
 *@description 유저 정보 조회 api 응답
 */
export type GetAuthInfoResponse = {
  createdAt: string;
  email: string;
  id: string;
  nickname: string;
};
