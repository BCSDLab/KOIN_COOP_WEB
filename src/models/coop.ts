import { z } from 'zod';

export const SoldOutParams = z.object({
  menu_id: z.number(),
  sold_out: z.boolean(),
});

export type SoldOutParams = z.infer<typeof SoldOutParams>;

export const DiningImageParams = z.object({
  menu_id: z.number(),
  image_url: z.string(),
});

export type DiningImageParams = z.infer<typeof DiningImageParams>;
