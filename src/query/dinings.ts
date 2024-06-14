import { getDinings } from 'api/dinings';
import { Dinings } from 'models/dinings';

import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetDinings = (date: string) => {
  const { data } = useSuspenseQuery<Dinings>({
    queryKey: [date],
    queryFn: () => getDinings(date),
  });
  return { data };
};
