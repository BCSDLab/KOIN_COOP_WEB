import { patchSoldOut } from 'api/coop';
import { SoldOutParams } from 'models/coop';
import { Dining } from 'models/dinings';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

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
