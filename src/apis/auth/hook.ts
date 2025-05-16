import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAuthInfo,
  patchUserInfo,
  postCheckDuplicateEmail,
  postCheckDuplicateNickname,
  postEmailLogin,
  postSignup,
  postSocialLogin,
} from './api';
import {
  PatchUserInfoBody,
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
    mutationFn: (nickname: string) => postCheckDuplicateNickname(nickname),
  });
};

export const usePostCheckDuplicateEmail = () => {
  return useMutation({
    mutationFn: (email: string) => postCheckDuplicateEmail(email),
  });
};

/**
 *@description 자기 정보 수정 api 훅
 */
export const usePatchUserInfo = () => {
  return useMutation({
    mutationFn: (data: PatchUserInfoBody) => patchUserInfo(data),
  });
};
