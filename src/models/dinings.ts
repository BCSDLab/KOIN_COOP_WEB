import { z } from 'zod';

export const DiningsParams = z.string();

export type DiningsParams = z.infer<typeof DiningsParams>;

export type DiningType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export const DiningTypeSchema = z.union([
  z.literal('BREAKFAST'),
  z.literal('LUNCH'),
  z.literal('DINNER'),
]);

export const DINING_TYPES: DiningType[] = ['BREAKFAST', 'LUNCH', 'DINNER'];

export const DINING_TYPE_MAP = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
} as const;

export type DiningPlace = 'A코너' | 'B코너' | 'C코너' | '능수관' | '2캠퍼스';

export const PlaceSchema = z.union([
  z.literal('A코너'),
  z.literal('B코너'),
  z.literal('C코너'),
  z.literal('능수관'),
  z.literal('2캠퍼스'),
]);

export const MANAGING_PLACE: DiningPlace[] = ['A코너', 'B코너', 'C코너'];

export const OriginalDining = z.object({
  id: z.number(),
  date: z.string(),
  type: DiningTypeSchema,
  place: PlaceSchema,
  price_card: z.number().nullable(),
  price_cash: z.number().nullable(),
  kcal: z.number().nullable(),
  menu: z.array(z.string()),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  soldout_at: z.string().nullable(),
  changed_at: z.string().nullable(),
});

export type OriginalDining = z.infer<typeof OriginalDining>;

export const OriginalDinings = z.array(OriginalDining);

export const Dining = OriginalDining.omit({ menu: true }).extend({
  menus: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
});

export type Dining = z.infer<typeof Dining>;
