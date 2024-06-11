import { getCoopInfo } from 'api/coop';
import { CoopResponse } from 'models/coop';
import { userKeys } from 'query/KeyFactory/userKeys';

import { useSuspenseQuery } from '@tanstack/react-query';

type UserResponse = CoopResponse | null;

export default function useSuspenseUser() {
  const queryFn = getCoopInfo;

  const { data } = useSuspenseQuery<UserResponse>({
    queryKey: userKeys.userInfo,
    queryFn,
  });
  return { data };
}
