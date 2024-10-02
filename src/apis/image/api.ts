import {PostImageUploadBody} from '~/types/api/image/data';
import {imageApiCall} from '../common';

/**
 *@description 이미지 업로드 api 요청
 *@param {string} fileName - 이미지 이름
 *@param {string} bucketName - 저장할 R2버킷 이름
 */
export const postImageUpload = async ({
  fileName,
  data,
}: PostImageUploadBody) => {
  return imageApiCall<{
    ETag: string;
    ServerSideEncryption: string;
    Location: string;
    key: string;
    Bucket: string;
  }>({
    url: `aws/upload?filename=${fileName}`,
    data,
  });
};
