import { z } from 'zod';

export const LoginParams = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginParams = z.infer<typeof LoginParams>;

export interface LoginForm extends LoginParams {
  isAutoLogin: boolean;
}

export const LoginResponse = z.object({
  token: z.string(),
  refresh_token: z.string(),
  user_type: z.string(), // 삭제 가능성 있음
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

export const CoopMeResponse = z.object({
  email: z.string(),
  gender: z.number(),
  name: z.string(),
  phone_number: z.number(),
  user_type: z.string(),
});

export type CoopMeResponse = z.infer<typeof CoopMeResponse>;
