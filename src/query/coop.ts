import { getCoopMe } from 'api/auth';
import { updateSoldOut, uploadDiningImage } from 'api/coop';
import { DiningImagesParams, SoldOutParams } from 'models/coop';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { coopKeys } from './KeyFactory/coopKeys';

export const useUpdateSoldOut = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSoldOutMutation } = useMutation({
    mutationFn: (data: SoldOutParams) => updateSoldOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return {
    updateSoldOutMutation,
  };
};

export const useUploadDiningImage = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadDiningImageMutation } = useMutation({
    mutationFn: (data: DiningImagesParams) => uploadDiningImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return {
    uploadDiningImageMutation,
  };
};

export const useSuspenseCoopUser = () => {
  const { data } = useSuspenseQuery({
    queryKey: coopKeys.coopInfo,
    queryFn: getCoopMe,
  });
  return { data };
};
