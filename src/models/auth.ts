import { z } from 'zod';

export const UserType = z.union([
  z.literal('COOP'),
  z.null(),
]);

export type UserType = z.infer<typeof UserType>;

export const CoopMeResponse = z.object({
  email: z.string(),
  gender: z.number().nullable(),
  name: z.string(),
  phone_number: z.string(),
  user_type: UserType,
});

export type CoopMeResponse = z.infer<typeof CoopMeResponse>;

export const UserStorageInSession = z.object({
  isAuthenticated: z.boolean(),
  user: CoopMeResponse.nullable(),
});

export type UserStorageInSession = z.infer<typeof UserStorageInSession>;

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
  user_type: UserType, // 삭제 가능성 있음
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
