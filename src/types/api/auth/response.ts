import {AuthInfo, GenderType} from '.';

/**
 *@description 이메일 로그인 api 응답
 */
export type PostLoginResponse = AuthInfo;

/**
 *@description 유저 정보 조회 api 응답
 */
export type GetAuthInfoResponse = {
  createdAt: string;
  email: string;
  id: string;
  nickname: string;
  introduce?: string;
  profile?: string;
  age: number;
  gender: GenderType;
  firstCharacter: {
    id: string;
    name: string;
  };
};

/**
 *@description 회원가입 api 응답
 */
export type PostSignupResponse = AuthInfo;
