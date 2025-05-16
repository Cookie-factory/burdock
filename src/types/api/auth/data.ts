import {GenderType} from '.';

// 이메일 로그인 api 응답
export interface PostEmailLoginData {
  email: string;
  password: string;
}

export type SocialLoginType = 'kakao' | 'apple';

/**
 *@description 소셜로그인 api 데이터
 */
export interface PostSocialLoginData {
  social: SocialLoginType;
  token: string;
}

/**
 *@description 회원가입 api 데이터
 */
export interface PostSignupData {
  email: string;

  nickname: string;

  password: string;

  age: number;

  gender: GenderType;

  privacyAgree: boolean;
}

/**
 *@description 자기 정보 수정 api body
 */
export type PatchUserInfoBody = Partial<{
  nickname: string;
  age: number;
  gender: GenderType;
  introduce: string;
  firstCharacterId: string;
}>;
