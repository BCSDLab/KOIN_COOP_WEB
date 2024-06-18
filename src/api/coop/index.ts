import { accessClient } from 'api';
import { DiningImageParams, SoldOutParams } from 'models/coop';

export const patchSoldOut = async (data: SoldOutParams) => {
  await accessClient.patch<SoldOutParams>('/coop/dining/soldout', data);
};

export const patchDiningImage = async (data: DiningImageParams) => {
  await accessClient.patch<DiningImageParams>('/coop/dining/image', data);
};
