export const queryKeys = {
  board: {
    getBoardList: 'get board list',
    getBoard: 'get board',
    getPopularBoardList: 'get popular board list',
  },
  chatroom: {
    getChatroomList: 'get chatroom list',
  },
  message: {
    getMessageOnRoom: 'get message on room',
  },
  auth: {
    getAuthInfo: 'get auth info',
    getCheckDuplicateNickname: 'get check duplicate nickname',
  },
  notice: {
    getNotice: 'get notice',
    getNoticeList: 'get notice list',
  },
  character: {
    getCharacterList: 'get character list',
  },
  vote: {
    getVoteRank: 'get vote rank',
    getVoteSubjectList: 'get vote subject list',
    getRanking3PerThemes: 'get ranking 3 per themes',
  },

  comment: {
    getCommentList: 'get comment list',
  },

  user: {
    getUserInfo: 'get user info',
  },
  follow: {
    getFollowerList: 'get follower list',
    getFollowingList: 'get following list',
    getFollowInfo: 'get follow info',
  },
} as const;
