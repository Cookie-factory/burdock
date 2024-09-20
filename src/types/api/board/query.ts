// get /board api query
export type GetBoardListQuery = {
  take?: number;
  cursor?: string | null; // board id
};
