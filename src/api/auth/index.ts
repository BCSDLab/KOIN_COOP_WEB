import { accessClient, client } from 'api';
import {
  CoopMeResponse, LoginParams, LoginResponse, RefreshParams, RefreshResponse,
} from 'models/auth';

export const postLogin = async (param: LoginParams) => {
  const { data } = await client.post<LoginResponse>('/coop/login', param);
  return LoginResponse.parse(data);
};

export const postLogout = () => accessClient.post('/user/logout');

export const postRefresh = async (params: RefreshParams) => {
  const { data } = await client.post<RefreshResponse>('/user/refresh', params);
  return RefreshResponse.parse(data);
};

export const getCoopMe = async () => {
  const { data } = await accessClient.get<CoopMeResponse>('/user/coop/me');
  return CoopMeResponse.parse(data);
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (refreshToken) {
    try {
      const data = await postRefresh({ refresh_token: refreshToken });
      sessionStorage.setItem('access_token', data.token);
      localStorage.setItem('refresh_token', data.refresh_token);

      return data;
    } catch {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      return Promise.reject(new Error('refresh 과정에서 에러가 발생했습니다.'));
    }
  }

  return Promise.reject(new Error('refresh_token이 없습니다.'));
};
