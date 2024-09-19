import {PostLoginResponse} from '~/types/api/auth/response';
import {apiCall} from '../common';
import {PostEmailLoginData, PostSocialLoginData} from '~/types/api/auth/data';

export const postEmailLogin = (data: PostEmailLoginData) => {
  const testData2 = {
    email: 'test1@test.com',
    password: 'test1234',
  };

  return apiCall<PostLoginResponse>({
    method: 'POST',
    url: 'auth/login',
    data: testData2,
  });
};

export const postSocialLogin = (data: PostSocialLoginData) => {
  return apiCall<PostLoginResponse>({
    method: 'POST',
    url: 'auth/social/login',
    data,
  });
};
