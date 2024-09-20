import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteBoard,
  getBoard,
  getBoardList,
  patchBoard,
  postBoard,
} from './api';
import {queryKeys} from '~/constants/queryKeys';
import {GetBoardListQuery} from '~/types/api/board/query';
import {PostBoardData} from '~/types/api/board/data';
import {IDQuery} from '~/types/api/common';

/**
 *@description 게시글 리스트 조회 api 훅
 */
export const useGetBoardList = (query: GetBoardListQuery) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.board.getBoardList, query],
    queryFn: ({pageParam}) => getBoardList(pageParam),
    initialPageParam: query,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      const previousData = [...lastPage.data];
      if (previousData.length !== 0) {
        return {
          cursor: previousData.reverse()[0].id,
          take: lastPageParam.take,
        } as GetBoardListQuery;
      } else {
        return null;
      }
    },
  });
};

/**
 *@description 게시글 등록 api 훅
 */
export const usePostBoard = () => {
  return useMutation({
    mutationKey: [queryKeys.board.getBoardList],
    mutationFn: (data: PostBoardData) => postBoard(data),
  });
};

/**
 *@description 게시글 내용 조회 api 훅
 */
export const useGetBoard = (query: IDQuery) => {
  return useQuery({
    queryKey: [queryKeys.board.getBoard, query.id],
    queryFn: () => getBoard(query),
  });
};

/**
 *@description 게시글 삭제 api 훅
 */
export const useDeleteBoard = () => {
  return useMutation({
    mutationFn: (query: IDQuery) => deleteBoard(query),
  });
};

type PatchBoardParam = {
  id: string;
  data: Partial<PostBoardData>;
};

/**
 *@description 게시글 수정 api 훅
 */
export const usePatchBoard = () => {
  return useMutation({
    mutationFn: (param: PatchBoardParam) =>
      patchBoard({id: param.id}, param.data),
  });
};
