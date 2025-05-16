import {
  GetAuthInfoResponse,
  PostLoginResponse,
} from '~/types/api/auth/response';
import {apiCall} from '../common';
import {
  PatchUserInfoBody,
  PostEmailLoginData,
  PostSignupData,
  PostSocialLoginData,
} from '~/types/api/auth/data';
import {MutationResponse} from '~/types/api/common/response';

export const postEmailLogin = (data: PostEmailLoginData) => {
  const testData2 = {
    email: 'test1@test.com',
    password: 'test1234',
  };

  return apiCall<PostLoginResponse>({
    method: 'POST',
    url: 'auth/login',
    data,
    // data: testData2,
  });
};

export const postSocialLogin = (data: PostSocialLoginData) => {
  return apiCall<PostLoginResponse>({
    method: 'POST',
    url: 'auth/social/login',
    data,
  });
};

export const getAuthInfo = () => {
  return apiCall<GetAuthInfoResponse>({
    method: 'GET',
    url: 'auth/info',
  });
};

export const postSignup = (data: PostSignupData) => {
  return apiCall({
    method: 'POST',
    url: 'auth/signup',
    data,
  });
};

export const postCheckDuplicateNickname = (nickname: string) => {
  return apiCall<string>({
    method: 'POST',
    url: `auth/nickname/duplicate`,
    data: {nickname},
  });
};

export const postCheckDuplicateEmail = (email: string) => {
  return apiCall<string>({
    method: 'POST',
    url: 'auth/email/duplicate',
    data: {email},
  });
};

/**
 *@description 자기정보 수정 api
 */
export const patchUserInfo = (data: PatchUserInfoBody) => {
  return apiCall<MutationResponse>({
    method: 'PATCH',
    url: 'auth',
    data,
  });
};
