import {useMutation} from '@tanstack/react-query';
import {postEmailLogin, postSocialLogin} from './api';
import {PostEmailLoginData, PostSocialLoginData} from '~/types/api/auth/data';

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
