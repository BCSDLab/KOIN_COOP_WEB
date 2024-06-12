import { z } from 'zod';

export const SoldOutParams = z.object({
  menu_id: z.number(),
  sold_out: z.boolean(),
});

export type SoldOutParams = z.infer<typeof SoldOutParams>;

export const DiningImagesParams = z.object({
  menu_id: z.number(),
  image_url: z.string(),
});

export type DiningImagesParams = z.infer<typeof DiningImagesParams>;
