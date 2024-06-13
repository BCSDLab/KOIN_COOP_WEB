import { getDining } from 'api/dinings';

import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetDining = (date: string) => {
  const { data } = useSuspenseQuery(
    {
      queryKey: [date],
      queryFn: () => getDining(date),
    },
  );
  return { data };
};
