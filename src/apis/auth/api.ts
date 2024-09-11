import {PostEmailLoginResponse} from '~/types/api/auth/response';
import {apiCall} from '../common';
import {PostEmailLoginData} from '~/types/api/auth/data';

export const postEmailLogin = (data: PostEmailLoginData) => {
  const testData2 = {
    email: 'test1@test.com',
    password: 'test1234',
  };

  return apiCall<PostEmailLoginResponse>({
    method: 'POST',
    url: 'auth/login',
    data: testData2,
  });
};
