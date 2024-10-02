/**
 *@description 로컬에서 이미지 업로드한 데이터
 *@description cloudImageName 값은 있지만 cloudData가 undefined면 수정글에서 불러온 이미지이다.ㄴ
 */
export interface RegisterImageData {
  // 핸드폰 내, 로컬 이미지 경로 이름
  localImageName?: string;
  // 클라우드에 등록되어있는 이미지 이름으로, 게시글 폼 데이터로 보낼 데이터
  cloudImageName: string;
  // 클라우드에만 올릴 이미지 데이터
  cloudData?: PostCloudImageData;
  // 서버 db에 이미지 이름이 등록되어 있는지 여부
  type: 'REGISTERED' | 'UNREGISTERED';
}

export interface PostCloudImageData {
  uri: string;
  type: string;
  name: string;
}
