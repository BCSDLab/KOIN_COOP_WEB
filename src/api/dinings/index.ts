import { accessClient } from 'api';
import { DiningsParams, OriginalDinings, DiningExcelParams } from 'models/dinings';

export const getDinings = async (date: DiningsParams) => {
  const { data } = await accessClient.get<DiningsParams>(`/dinings?date=${date}`);
  return OriginalDinings.parse(data);
};

export const getExcel = async (params: DiningExcelParams) => {
  const response = await accessClient.get(
    `/coop/dining/excel?startDate=${params.startDate}&endDate=${params.endDate}&isCafeteria=${params.isCafeteria}`,
    { responseType: 'blob' },
  );

  return response;
};
