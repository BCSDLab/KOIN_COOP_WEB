import { accessClient } from 'api';
import { DiningsParams, OriginalDinings } from 'models/dinings';

export const getDinings = async (date: DiningsParams) => {
  const { data } = await accessClient.get<DiningsParams>(`/dinings?date=${date}`);
  return OriginalDinings.parse(data);
};
