import { useNavigate } from 'react-router-dom';

import { postLogin, postLogout } from 'api/auth';
import { LoginForm } from 'model/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';

import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useMutation } from '@tanstack/react-query';

export interface ErrorResponse {
  response: undefined | {
    message: string;
    data: {
      code: number;
      message: string;
      violations: {
        field: string;
        message: string;
      }[];
    }
  }
  message: string;
}

export const useLogin = () => {
  const { setLoginError, setLoginErrorStatus } = useErrorMessageStore();
  const navigate = useNavigate();

  const {
    mutate, error, isError, isSuccess,
  } = useMutation({
    mutationFn: (variables: LoginForm) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: async (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }
      navigate('/');
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setLoginError(err.message || '로그인을 실패했습니다.');
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (err.status === 400) {
          setLoginError('아이디 혹은 비밀번호가 일치하지 않습니다.');
          return;
        }
        if (err.status === 403) {
          setLoginErrorStatus(err.status);
          setLoginError('관리자 승인 대기 중입니다.');
          return;
        }
        if (err.status === 404) {
          setLoginError('가입되지 않은 이메일입니다.');
          return;
        }
        if (err.status === 500) {
          setLoginError('서버 오류가 발생했습니다.');
          return;
        }
        sendClientError(err);
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
      sessionStorage.removeItem('user_type');
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
