/**
 *@description 객체 특정 property들 optional로 변경
 */

export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
