import { getCoopInfo } from 'api/coop';
import { CoopMeResponse } from 'models/auth';
import { userKeys } from 'query/KeyFactory/userKeys';

import { useSuspenseQuery } from '@tanstack/react-query';

export default function useSuspenseUser() {
  const { data } = useSuspenseQuery<CoopMeResponse | null>({
    queryKey: userKeys.userInfo,
    queryFn: () => getCoopInfo(),
  });
  return { data };
}
