import dayjs from 'dayjs';

/**
 *@description 현재 시간 기준 얼마나 지났는지 알려주는 유틸함수
 */
export const getTimeFromNow = (updatedTime?: string | Date) => {
  if (!updatedTime) return '';

  const seconds = dayjs().unix() - dayjs(updatedTime).unix();

  if (seconds < 60) return `방금 전`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return dayjs(updatedTime).format('YY.MM.DD');
};

export default getTimeFromNow;

/**
 *@description 앞으로 몇 시간 남았는지 알려주는 유틸함수
 */
export const getRemainTimeFromNow = (targetTime?: string | Date | null) => {
  if (!targetTime) return '';

  const seconds = dayjs(targetTime).unix() - dayjs().unix();

  if (seconds < 0) return 'END';

  const minutes = seconds / 60;
  if (minutes < 60) return `D-${Math.floor(minutes)}분`;

  const hours = minutes / 60;
  if (hours < 24) return `D-${Math.floor(hours)}시간`;

  const days = hours / 24;

  if (days > 60) return '';
  return `D-${Math.floor(days)}일`;
};
