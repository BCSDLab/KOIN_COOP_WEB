import { client } from 'api';
import { RefreshParams, RefreshResponse } from 'model/auth';

import create from 'zustand';
import { devtools } from 'zustand/middleware';

type LoginProps = {
  credentials: {
    email: string;
    password: string;
  };
  isAutoLogin: boolean;
};

const useAuthenticationStore = create(
  devtools((set) => ({
    isAuthenticated: false,
    initialize: async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await client.post<RefreshResponse>('/user/refresh', { refresh_token: refreshToken });
          sessionStorage.setItem('access_token', data.token);
          localStorage.setItem('refresh_token', data.refresh_token);
          set({ isAuthenticated: true });
        } catch (error) {
          sessionStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          set({ isAuthenticated: false });
        }
      }
    },
    login: async ({ credentials, isAutoLogin }: LoginProps) => {
      try {
        const { data } = await client.post('/user/login', credentials);
        sessionStorage.setItem('access_token', data.token);
        if (isAutoLogin) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
        set({ isAuthenticated: true });
      } catch (error) {
        set({ isAuthenticated: false });
        throw error;
      }
    },
    logout: async () => {
      try {
        await client.post('/user/logout');
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ isAuthenticated: false });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  })),
);

export default useAuthenticationStore;
