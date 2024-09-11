import {useMutation} from '@tanstack/react-query';
import {postEmailLogin} from './api';
import {PostEmailLoginData} from '~/types/api/auth/data';

export const usePostEmailLogin = () => {
  return useMutation({
    mutationFn: (data: PostEmailLoginData) => postEmailLogin(data),
  });
};
