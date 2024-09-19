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
