/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-throw-literal */
import API_PATH from 'config/env';
import { CustomAxiosError, KoinError } from 'models/error';

import axios, { AxiosError } from 'axios';

import { refresh } from './auth';

const client = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 20000,
});

const accessClient = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 20000,
});

function isAxiosErrorWithResponseData(error: AxiosError<KoinError>) {
  const { response } = error;
  return response?.status !== undefined
    && response.data.code !== undefined
    && response.data.message !== undefined;
}

function createKoinErrorFromAxiosError(error: AxiosError<KoinError>): KoinError | CustomAxiosError {
  if (isAxiosErrorWithResponseData(error) && error.response) {
    const koinError = error.response;

    return {
      type: 'KOIN_ERROR',
      status: koinError.status,
      code: koinError.data.code,
      message: koinError.data.message,
    };
  }

  return {
    type: 'AXIOS_ERROR',
    ...error,
  };
}

accessClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    const { headers } = config;

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;

      return config;
    }

    return config;
  },
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료시 새로운 accessToken으로 재요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refresh();
    }

    throw createKoinErrorFromAxiosError(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    throw createKoinErrorFromAxiosError(error);
  },
);

export { client, accessClient };
