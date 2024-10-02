import {useMutation} from '@tanstack/react-query';
import {PostImageUploadBody} from '~/types/api/image/data';
import {postImageUpload} from './api';

/**
 *@description 이미지 업로드 api 요청 hook
 *@param {string} fileName - 이미지 이름
 *@param {string} bucketName - 저장할 R2버킷 이름
 */
export const usePostImageUpload = () => {
  return useMutation({
    mutationFn: (data: PostImageUploadBody) => postImageUpload(data),
  });
};
