import {useState} from 'react';

import {multipleImagePicker} from '~/utils/image';
import uuid from 'react-native-uuid';
import {Platform} from 'react-native';
import {PostCloudImageData, RegisterImageData} from '~/types/util/image';
import {usePostImageUpload} from '~/apis/image/hook';

interface Props {
  isSubmitFormLoading: boolean;
  maxImageUploadCount?: number;
}

/**
 *@description 이미지 업로드 api 훅 및 요청 핸들러, 이미지 업로드 관련 state 반환 커스텀 훅
 */
function useImagePickerUpload({
  isSubmitFormLoading,
  maxImageUploadCount = 1,
}: Props) {
  const postImageUpload = usePostImageUpload();

  // 앱에서 이미지 로드 중인 여부 state
  const [isImageLoad, setImageLoad] = useState(false);

  // 로컬에서 불러온 이미지 데이터 리스트
  const [imageDatas, setImageDatas] = useState<RegisterImageData[]>([]);

  /**
   *@description 휴대폰 내, 이미지 선택 핸들러
   */
  const onImagePicker = () => {
    // 이미지가 업로드 중이면 핸들러 반환
    if (
      (isImageLoad && isSubmitFormLoading) ||
      imageDatas.length >= maxImageUploadCount
    ) {
      return;
    }

    setImageLoad(true);

    multipleImagePicker(maxImageUploadCount - imageDatas.length)
      .then(response => {
        const _registerPageImageNames: RegisterImageData[] = [];

        response.forEach(item => {
          const cloudImageNameUUID = uuid.v4() as string;
          const iosSourceURL = item.sourceURL ?? '';
          let imageInfoURI =
            Platform.OS === 'android' ? item.path : iosSourceURL;

          // 이미지 이름에 확장자 추가
          const uriSplitDot = imageInfoURI.split('.');
          const ext = uriSplitDot[uriSplitDot.length - 1];

          const cloudImageName = `${cloudImageNameUUID}.${ext}`;

          _registerPageImageNames.push({
            localImageName:
              Platform.OS === 'android' ? item.path : iosSourceURL,
            cloudImageName, // 서버 db에 등록될 이미지 이름
            cloudData: {
              uri: imageInfoURI,
              type: item.mime,
              name: cloudImageName,
            }, // cloud s3에 등록될 파일 내용
            type: 'UNREGISTERED',
          });
        });

        // 하나만 이미지 선택 경우 push가 아니라 갱신한다.
        if (maxImageUploadCount === 1) {
          setImageDatas(_registerPageImageNames);
        } else {
          setImageDatas(prev => [...prev, ..._registerPageImageNames]);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setImageLoad(false);
      });
  };

  /**
   *@description aws로 이미지 전송 함수
   */
  const onImageUpload = async (callback: () => void) => {
    try {
      const imageInfo = imageDatas.reduce<PostCloudImageData[]>(
        (result, item) => {
          // cloudData있는 image만 (수정상태 불러온 이미지 제외)
          if (item.cloudData) {
            result.push(item.cloudData);
          }

          return result;
        },
        [],
      );

      for (let i = 0; i < imageInfo.length; i++) {
        const data = new FormData();
        data.append('file', imageInfo[i]);

        await postImageUpload.mutateAsync({data, fileName: imageInfo[i].name});
      }

      // 이미지 클라우드에 업로드 후, 콜백 실행
      callback();
    } catch (error) {
      console.error('@@@ error');
      //@ts-ignore
      console.error(error.data);
      throw {
        message: '이미지 업로드 시, 에러 발생',
      };
    }
  };

  return {
    onImageUpload,
    postImageUpload,
    onImagePicker,
    isImageLoad,
    imageDatas,
    setImageDatas,
  };
}

export default useImagePickerUpload;
