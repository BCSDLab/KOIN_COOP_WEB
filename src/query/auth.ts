import { useNavigate } from 'react-router-dom';

import { getCoopMe, postLogin, postLogout } from 'api/auth';
import { LoginForm, LoginResponse } from 'models/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';

import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userKeys } from './KeyFactory/userKeys';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsLoginError, setLoginErrorMessage } = useErrorMessageStore();

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
      navigate('/');
    },
    onError: (err) => {
      if (isKoinError(err)) {
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        let errorMessage;
        switch (err.status) {
          case 400:
          case 404:
            errorMessage = '아이디 또는 비밀번호를 잘못 입력했습니다.';
            break;
          case 403:
            errorMessage = '관리자 승인 대기 중입니다.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다.';
            break;
          default:
            errorMessage = '로그인을 실패했습니다.';
            sendClientError(err);
        }

        setLoginErrorMessage(errorMessage);
        setIsLoginError(true);
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
