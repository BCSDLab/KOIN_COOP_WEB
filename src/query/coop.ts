import { getCoopMe } from 'api/auth';
import { patchSoldOut, uploadDiningImage } from 'api/coop';
import { DiningImagesParams, SoldOutParams } from 'models/coop';
import { Dining } from 'models/dinings';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { coopKeys } from './KeyFactory/coopKeys';
import { diningsKeys } from './KeyFactory/diningsKeys';

export const useSoldOut = () => {
  const queryClient = useQueryClient();
  const { mutate: toggleSoldOut } = useMutation({
    mutationFn: async (data: Dining) => {
      const current = !!data.soldout_at;
      const params: SoldOutParams = { menu_id: data.id, sold_out: !current };
      await patchSoldOut(params);
    },
    onSuccess: (_, variable) => {
      queryClient.refetchQueries({
        queryKey: diningsKeys.date(dayjs(variable.date).format('YYMMDD')),
      });
    },
  });
  return toggleSoldOut;
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
