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

export const LoginParams = z.object({
  id: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export type LoginParams = z.infer<typeof LoginParams>;

export interface LoginForm extends LoginParams {
  isAutoLogin: boolean;
}

export const LoginResponse = z.object({
  token: z.string(),
  refresh_token: z.string(),
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
