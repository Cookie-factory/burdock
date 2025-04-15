export const queryKeys = {
  board: {
    getBoardList: 'get board list',
    getBoard: 'get board',
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
  celebrity: {
    getCelebrityList: 'get celebrity list',
  },
  vote: {
    getVoteRank: 'get vote rank',
  },

  comment: {
    getCommentList: 'get comment list',
  },
} as const;
