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
