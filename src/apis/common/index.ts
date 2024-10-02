import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import _ from 'lodash';
import {Platform} from 'react-native';
import {PostLoginResponse} from '~/types/api/auth/response';
import {ErrorResponse} from '~/types/api/common';
import {config} from '~/utils/config';
import {getSecurityData, setSecurityData} from '~/utils/storage';

// 임시 베이스 URL, 추후 env 파일 적용 시, development, production으로 나눌 예정
export const BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000'
  : config.BASE_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const errorResponse = error.response;

    if (errorResponse) {
      const refreshToken = await getSecurityData(config.REFRESH_TOKEN_NAME);

      if (
        errorResponse?.data?.code === 401 &&
        errorResponse?.data?.message === 'Unauthorized' &&
        refreshToken
      ) {
        const responseRefreshAuth = (await axiosInstance({
          method: 'POST',
          url: `auth/refresh`,
          headers: {
            Accept: 'application/json',
          },
          data: {
            refreshToken,
          },
        })) as {
          data: PostLoginResponse;
        };

        setSecurityData(
          config.ACCESS_TOKEN_NAME,
          responseRefreshAuth.data.access,
        );
        setSecurityData(
          config.REFRESH_TOKEN_NAME,
          responseRefreshAuth.data.refresh,
        );

        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${responseRefreshAuth.data.access}`,
        };
        const response = await axios.request(error.config);
        return response;
      }

      if (
        errorResponse?.data?.code === 500 &&
        errorResponse?.data?.message === 'Unauthorized' &&
        refreshToken
      ) {
        // 로그인 상태이지만, refreshToken 및 accessToken 만료
        // 이전 버전 패치 후, TODO: 추후 작업
      }
    }

    return Promise.reject(error);
  },
);

/**
 *@description api 공통 호출 모듈
 *@param props - axios 라이브러리 props (url, method, headers, baseURL ...)
 */
export const apiCall = async <ResponseType = any>(
  props: AxiosRequestConfig,
) => {
  const accessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);

  if (__DEV__) {
    console.log('@ 1. URL');
    console.log(props.url);
    console.log('@ 2. DATA');
    console.log(props.data);
  }

  return axiosInstance({
    ...props,
    headers: {
      Accept: 'application/json',
      ...props.headers,
      Authorization: 'Bearer ' + `${accessToken}`,
    },
    url: `${props.url}`,
  })
    .then(({data, status}: {data: ResponseType; status: number}) => {
      return {
        data,
        statusCode: status,
      };
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response?.data as ErrorResponse;

        if (__DEV__) {
          console.log('@ API ERROR RESPONSE @');
          console.log(data);
        }

        throw {
          message: _.isString(data)
            ? data
            : _.isArray(data.message)
            ? data.message[0]
            : data.message,
          statusCode: data?.statusCode || 500,
        };
      } else {
        throw {
          data: error?.message ?? '',
          statusCode: error.response?.status,
        };
      }
    });
};

/**
 *@description api 요청 후, 일정시간 응답이 없을 경우, 요청 캔슬
 *@param time - api 요청 후, 응답이 안올때까지 기다리는 시간
 */
const apiTimeout = (time: number) => {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller.signal;
};

/**
 *@description fetch용 api 파일 업로드 호출 모듈 (axios 측 업로드가 서버측으로 undefined 값만 보내서 대체용)
 */
export const imageApiCall = async <ResponseType = any>(props: {
  url: string;
  data: FormData;
  timeout?: number;
}) => {
  const accessToken = await getSecurityData(config.ACCESS_TOKEN_NAME);
  if (__DEV__) {
    console.log('@ API CALL PREVIOUS @');
    console.log(`accessToken : ${accessToken}`);
    console.log(`path : ${BASE_URL}/${props.url}`);
    console.log('');
  }

  return fetch(`${BASE_URL}/${props.url}`, {
    method: 'POST',
    body: props.data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: apiTimeout(props.timeout ?? 600),
  })
    .then(async response => {
      const data = (await response.json()) as ResponseType;
      if (__DEV__) {
        console.log('@ API SUCCESS RESPONSE @');
        console.log(data);
      }

      return {
        data,
        statusCode: response.status,
      };
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response?.data as ErrorResponse;

        if (__DEV__) {
          console.log('@ API ERROR RESPONSE @');
          console.log(data);
        }

        throw {
          message: data?.message || '',
          statusCode: data?.statusCode || 500,
        };
      } else {
        throw {
          data: error,
          statusCode: error.response?.status,
        };
      }
    });
};
