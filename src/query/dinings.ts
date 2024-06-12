import { getDining } from 'api/dinings';

import { useSuspenseQuery } from '@tanstack/react-query';

import { diningsKeys } from './KeyFactory/diningsKeys';

export const useGetDining = (date: string) => {
  const { data } = useSuspenseQuery(
    {
      queryKey: [diningsKeys.diningsInfo, date],
      queryFn: () => getDining(date),
    },
  );
  return {
    data,
  };
};
