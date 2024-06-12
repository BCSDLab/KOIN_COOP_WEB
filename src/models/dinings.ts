import { z } from 'zod';

export const DiningsParams = z.string();

export type DiningsParams = z.infer<typeof DiningsParams>;

export type DiningType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export const DiningTypeSchema = z.union([
  z.literal('BREAKFAST'),
  z.literal('LUNCH'),
  z.literal('DINNER'),
]);

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

export const Dinings = z.object({
  id: z.number(),
  date: z.string(),
  type: DiningTypeSchema,
  place: PlaceSchema,
  price_card: z.number(),
  price_cash: z.number(),
  kcal: z.number(),
  menu: z.array(z.string()),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  soldout_at: z.string().nullable(),
  changed_at: z.string().nullable(),
});

export type Dinings = z.infer<typeof Dinings>;
