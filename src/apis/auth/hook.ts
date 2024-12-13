import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAuthInfo,
  getCheckDuplicateNickname,
  postEmailLogin,
  postSignup,
  postSocialLogin,
} from './api';
import {
  PostEmailLoginData,
  PostSignupData,
  PostSocialLoginData,
} from '~/types/api/auth/data';
import {queryKeys} from '~/constants/queryKeys';

export const usePostEmailLogin = () => {
  return useMutation({
    mutationFn: (data: PostEmailLoginData) => postEmailLogin(data),
  });
};

export const usePostSocialLogin = () => {
  return useMutation({
    mutationFn: (data: PostSocialLoginData) => postSocialLogin(data),
  });
};

export const useGetAuthInfo = () => {
  return useQuery({
    queryKey: [queryKeys.auth.getAuthInfo],
    queryFn: () => getAuthInfo(),
  });
};

export const usePostSignup = () => {
  return useMutation({
    mutationFn: (data: PostSignupData) => postSignup(data),
  });
};

export const usePostCheckDuplicateNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => getCheckDuplicateNickname(nickname),
  });
};
