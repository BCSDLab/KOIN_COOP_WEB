import { accessClient } from 'api';
import { DiningImagesParams, SoldOutParams } from 'models/coop';

export const patchSoldOut = async (data: SoldOutParams) => {
  await accessClient.patch<SoldOutParams>('/coop/dining/soldout', data);
};

export const uploadDiningImage = async (data: DiningImagesParams) => {
  await accessClient.patch<DiningImagesParams>('/coop/dining/image', data);
};
