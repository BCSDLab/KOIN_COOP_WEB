import { useNavigate } from 'react-router-dom';

import { postLogin, postLogout } from 'api/auth';
import { LoginForm, LoginResponse } from 'models/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import useUserStore from 'store/useUserStore';

import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { setLoginError, setLoginErrorStatus } = useErrorMessageStore();
  const navigate = useNavigate();
  const { initializeAuth } = useUserStore();

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
      await initializeAuth();
      navigate('/');
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setLoginError(err.message || '로그인을 실패했습니다.');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user_storage');
        localStorage.removeItem('refresh_token');

        switch (err.status) {
          case 400:
            setLoginError('아이디 혹은 비밀번호가 일치하지 않습니다.');
            break;
          case 403:
            setLoginErrorStatus(err.status);
            setLoginError('관리자 승인 대기 중입니다.');
            break;
          case 404:
            setLoginError('가입되지 않은 이메일입니다.');
            break;
          case 500:
            setLoginError('서버 오류가 발생했습니다.');
            break;
          default:
            sendClientError(err);
        }
      }
    },
  });

  return {
    login: mutate, error, isError, isSuccess,
  };
};

export const useLogout = () => {
  const { setLogoutError, setLogoutErrorCode } = useErrorMessageStore();

  const { mutate, error, isError } = useMutation({
    mutationFn: async () => {
      const response = await postLogout();
      if (response) {
        return true;
      }
      throw new Error('로그아웃 실패');
    },
    onSuccess: () => {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user_storage');
      localStorage.removeItem('refresh_token');
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setLogoutError(err.message || '로그아웃을 실패했습니다.');
        setLogoutErrorCode(err.code);
      } else {
        sendClientError(error);
      }
    },
  });

  return { logout: mutate, error, isError };
};
