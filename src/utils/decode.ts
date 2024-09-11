import {jwtDecode, JwtPayload} from 'jwt-decode';
import {getSecurityData} from './storage';
import {config} from './config';

/**
 *@description 토큰 디코드 유틸 함수
 */
export const decodeToken = <T>(token?: string | null): T | null => {
  if (!token) return null;

  return jwtDecode(token);
};

/**
 *@description access, refresh token 디코드 유틸 함수
 */
export const decodeAuthToken = async () => {
  try {
    const accessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);
    const refreshToken = await getSecurityData(config.REFRESH_TOKEN_NAME);

    return [
      decodeToken<JwtPayload>(accessToken),
      decodeToken<JwtPayload>(refreshToken),
    ] as unknown as JwtPayload[] | null;
  } catch (error) {
    throw error;
  }
};
