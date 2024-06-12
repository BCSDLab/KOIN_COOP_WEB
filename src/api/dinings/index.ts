import { accessClient } from 'api';
import { DiningsParams } from 'models/dinings';

export const getDining = async (date: DiningsParams) => {
  const { data } = await accessClient.get(`/dinings?date=${date}`);
  return data;
};
