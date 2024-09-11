/**
 *@description 텍스트 다루는 유틸
 */

import {EMOJI_REGEX} from '~/constants/regEx';

/**
 *@description 텍스트 하이픈 제거 함수
 */
export function deleteHypen(text: string) {
  return text.replace(/\-/g, '');
}

/**
 *@description 텍스트 하이픈 추가 함수
 */
export function addHypen(text: string) {
  return text.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/**
 *@description 이모지 제거 함수
 */
export const changeEmojiText = (text: string) => {
  return text.replace(EMOJI_REGEX, '');
};
