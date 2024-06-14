import { accessClient } from 'api';
import { Dinings, DiningsParams } from 'models/dinings';

export const getDinings = async (date: DiningsParams) => {
  const { data } = await accessClient.get<DiningsParams>(`/dinings?date=${date}`);
  return Dinings.parse(data);
};
