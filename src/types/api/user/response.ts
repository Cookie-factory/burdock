/**
 *@description 유저 정보 조회 api 응답
 */
export type GetUserInfoResponse = {
  id: string;
  nickname: string;
  introduce?: string;
  profile?: string;
  firstCharacter: {
    id: string;
    name: string;
  };
  _count: {
    Board: number;
    following: number;
    follower: number;
  };
  follower: {followerId: string}[];
};
