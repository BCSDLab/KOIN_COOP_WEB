import { accessClient, client } from 'api';
import { CoopMeResponse, LoginParams, LoginResponse } from 'models/auth';

export const postLogin = async (param: LoginParams) => {
  const { data } = await client.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const postLogout = () => accessClient.post('/user/logout');

export const getCoopMe = async () => {
  const { data } = await accessClient.get<CoopMeResponse>('/user/coop/me');
  return CoopMeResponse.parse(data);
};
