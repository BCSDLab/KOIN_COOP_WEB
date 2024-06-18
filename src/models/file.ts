import { z } from 'zod';

export interface FileData {
  content_length: number;
  content_type: string;
  file_name: string;
}

export const UploadUrlResponse = z.object({
  pre_signed_url: z.string(),
  file_url: z.string(),
  expiration_date: z.string(),
});

export type UploadUrlResponse = z.infer<typeof UploadUrlResponse>;

export const UPLOAD_HEADER = {
  headers: {
    'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
  },
};
