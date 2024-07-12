import { useNavigate } from 'react-router-dom';

import { getCoopMe, postLogin, postLogout } from 'api/auth';
import { LoginForm, LoginResponse } from 'models/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';

import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userKeys } from './KeyFactory/userKeys';

const COOP_LOGIN_ERROR_CODES = [400, 404, 403, 500];

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setLoginErrorStatus, setIsLoginError, setLoginErrorMessage } = useErrorMessageStore();

  const {
    mutate, error, isError, isSuccess,
  } = useMutation({
    mutationFn: (form: LoginForm) => postLogin(form),
    onSuccess: async (data: LoginResponse, form: LoginForm) => {
      if (data.token) {
        sessionStorage.setItem('access_token', data.token);
      }

      if (form.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      setLoginErrorMessage('');
      navigate('/', { replace: true });
    },
    onError: (err) => {
      if (isKoinError(err)) {
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        if (!COOP_LOGIN_ERROR_CODES.includes(err.status)) {
          sendClientError(err);
        }

        setIsLoginError(true);
        setLoginErrorStatus(err.status);
      }
    },
  });

  return {
    login: mutate, error, isError, isSuccess,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setLogoutErrorMessage: setLogoutError } = useErrorMessageStore();

  const { mutate, error, isError } = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: async () => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      queryClient.clear();
      navigate('/login');
    },
    onError: async (err) => {
      if (isKoinError(err)) {
        setLogoutError(err.message || '로그아웃을 실패했습니다.');
      } else {
        sendClientError(error);
      }
    },
  });

  return { logout: mutate, error, isError };
};

export const useCoopMe = () => {
  const token = sessionStorage.getItem('access_token');

  const {
    data, error, isError, isLoading,
  } = useQuery({
    queryKey: userKeys.all,
    queryFn: async () => {
      const response = await getCoopMe();
      return response;
    },
    enabled: !!token,
  });

  return {
    user: data, error, isError, isLoading,
  };
};
