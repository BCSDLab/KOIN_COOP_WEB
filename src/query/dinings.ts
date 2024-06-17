import { getDinings } from 'api/dinings';
import {
  Dining, DINING_TYPES, MANAGING_PLACE, OriginalDining,
} from 'models/dinings';
import { diningsKeys } from 'query/KeyFactory/diningsKeys';

import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetDinings = (date: string) => {
  const { data: dinings } = useSuspenseQuery<OriginalDining[], Error, Dining[]>({
    queryKey: diningsKeys.date(date),
    queryFn: async () => getDinings(date),
    select: (originalDinings) => {
      const menusFieldDinings = originalDinings.map((dining) => ({
        ...dining,
        menus: dining.menu.map((menuName, index) => ({ id: index, name: menuName })),
      })) as Array<Dining>;

      const thisDate = originalDinings.length > 0 ? originalDinings[0].date : date;

      MANAGING_PLACE.forEach((place, i1) => {
        DINING_TYPES.forEach((type, i2) => {
          const exists = menusFieldDinings
            .some((dining) => dining.place === place && dining.type === type);
          if (!exists) {
            menusFieldDinings.push({
              id: 10 * i1 + i2, // 의미 없는 값
              date: thisDate,
              type,
              place,
              price_card: 0,
              price_cash: 0,
              kcal: 0,
              menus: [{ id: 0, name: '미제공' }],
              image_url: null,
              created_at: thisDate,
              updated_at: thisDate,
              soldout_at: null,
              changed_at: null,
            } as Dining);
          }
        });
      });

      return menusFieldDinings;
    },
  });
  return { dinings };
};
