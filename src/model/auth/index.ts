import z from 'zod';

export const LoginParams = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginParams = z.infer<typeof LoginParams>;

export const LoginResponse = z.object({
  refresh_token: z.string(),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;

export const RefreshParams = z.object({
  refresh_token: z.string(),
});

export type RefreshParams = z.infer<typeof RefreshParams>;

export const RefreshResponse = z.object({
  token: z.string(),
  refresh_token: z.string(),
});

export type RefreshResponse = z.infer<typeof RefreshResponse>;

export const UserFile = z.object({
  file_name: z.string(),
  file_url: z.string(),
  id: z.number(),
});

export type UserFile = z.infer<typeof UserFile>;

export interface LoginForm extends LoginParams {
  isAutoLogin: boolean;
}
