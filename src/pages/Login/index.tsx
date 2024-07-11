import { useState } from 'react';

import BlindIcon from 'assets/svg/auth/blind.svg?react';
import KoinLogo from 'assets/svg/auth/koin-logo.svg?react';
import ShowIcon from 'assets/svg/auth/show.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import { useScrollLock } from 'hooks/useScrollLock';
import { LoginParams } from 'models/auth';
import { useLogin } from 'query/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import cn from 'utils/className';
import sha256 from 'utils/sha256';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';
import styles from './Login.module.scss';

const INQUIRY_LINK = 'https://docs.google.com/forms/d/1_pTvL-9Zo1f9cebi_J_8WFSa1Oj8tcEL_nh9IavsSaU/edit';

export default function Login() {
  const { login } = useLogin();
  const { isLoginError, setIsLoginError, setLoginErrorMessage } = useErrorMessageStore();
  const [isBlind,,,, changeIsBlind] = useBooleanState();
  const [isAutoLogin,,,, changeIsAutoLogin] = useBooleanState(true);
  const [isFormError, setIsFormError] = useState({ id: false, password: false });

  const { register, handleSubmit } = useForm<LoginParams>({
    resolver: zodResolver(LoginParams),
  });

  const onSubmit: SubmitHandler<LoginParams> = async (data) => {
    setIsFormError({ id: false, password: false });
    const hashedPassword = await sha256(data.password);
    login({ id: data.id, password: hashedPassword, isAutoLogin });
  };

  const onError = (error: FieldErrors<LoginParams>) => {
    setIsLoginError(false);
    setLoginErrorMessage('');
    setIsFormError((prev) => ({
      ...prev,
      id: !!error.id,
      password: !!error.password,
    }));
  };

  useScrollLock({ autoLock: true });

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <KoinLogo className={styles.logo} />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.form__wrapper}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isFormError.id || isLoginError,
              })}
              type="text"
              placeholder="아이디를 입력하세요."
              {...register('id')}
            />
            {(isFormError.id || isLoginError) && <ErrorMessage type="id" />}
          </div>
          <div className={styles.form__wrapper}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isFormError.password || isLoginError,
              })}
              type={isBlind ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요."
              {...register('password')}
            />
            {(isFormError.password || isLoginError) && <ErrorMessage type="password" />}
            <button
              type="button"
              className={styles['form__blind-icon']}
              onClick={changeIsBlind}
            >
              {isBlind ? <ShowIcon aria-hidden /> : <BlindIcon aria-hidden />}
            </button>
          </div>
          <button
            className={cn({
              [styles['form__login-button']]: true,
            })}
            type="submit"
          >
            로그인
          </button>
          <div className={styles.form__actions}>
            <a
              href={INQUIRY_LINK}
              className={styles.form__description}
              target="_blank"
              rel="noopener noreferrer"
            >
              BCSD Lab에&nbsp;
              <span className={styles['form__description--bold']}>
                문의하기
              </span>
            </a>
            <label className={styles['form__auto-login']} htmlFor="auto-login">
              <input
                className={styles['form__auto-login-checkbox']}
                type="checkbox"
                id="auto-login"
                defaultChecked
                onChange={changeIsAutoLogin}
              />
              &nbsp;
              <span className={styles['form__auto-login-label']}>
                로그인 유지
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
