export type BlockedUser = {
  id: string;
  blocked: {
    id: string;
    nickname: string;
    profile: string;
  };
};

export type SelectedBlockedUser = {
  targetUserId: string;
  targetUserNickname: string;
};
