import { useState } from 'react';

import BlindIcon from 'assets/svg/auth/blind.svg?react';
import Logo from 'assets/svg/auth/koin-logo.svg?react';
import ShowIcon from 'assets/svg/auth/show.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import useMediaQuery from 'hooks/useMediaQuery';
import { LoginParams } from 'models/auth';
import { useLogin } from 'query/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import cn from 'utils/className';
import sha256 from 'utils/sha256';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import ApprovalModal from './ApprovalModal';
import styles from './Login.module.scss';

export default function Login() {
  const [isBlind,,,, changeIsBlind] = useBooleanState();
  const [isAutoLogin,,,, changeIsAutoLogin] = useBooleanState(true);
  const { isMobile } = useMediaQuery();
  const { login, isError: isServerError } = useLogin();
  const [isFormError, setIsFormError] = useState(false);
  const { loginError, loginErrorStatus } = useErrorMessageStore();
  const [emailError, setEmailError] = useState('');
  const isError = isServerError || isFormError;

  const {
    register,
    handleSubmit,
  } = useForm<LoginParams>({
    resolver: zodResolver(LoginParams),
  });

  const onSubmit: SubmitHandler<LoginParams> = async (data) => {
    const hashedPassword = await sha256(data.password);
    login({ id: data.id, password: hashedPassword, isAutoLogin });
  };

  const onError = (error: FieldErrors<LoginParams>) => {
    setIsFormError(true);
    if (error.id) {
      setEmailError(error.id?.message || '');
    }
  };

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <Logo className={styles.logo} aria-hidden />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type="text"
              placeholder="아이디를 입력하세요."
              {...register('id')}
            />
            {(isError || !!isFormError) && (
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
            )}
          </div>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type={isBlind ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요."
              {...register('password')}
            />
            {(isError || !!isFormError) && (
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
            )}
            <button
              type="button"
              className={styles.form__icon}
              onClick={changeIsBlind}
            >
              {isBlind ? <ShowIcon aria-hidden /> : <BlindIcon aria-hidden />}
            </button>
          </div>
          <button
            className={cn({
              [styles.form__button]: true,
              [styles['form__button--login']]: true,
            })}
            type="submit"
          >
            로그인
          </button>
          <div className={styles['form__auto-login']}>
            <span className={styles.form__description}>BCSD Lab에 </span>
            &nbsp;
            <span className={styles['form__description--bold']}>문의하기</span>
            <label className={styles['form__auto-login__label']} htmlFor="auto-login">
              <input
                className={styles['form__auto-login__checkbox']}
                type="checkbox"
                id="auto-login"
                defaultChecked
                onChange={changeIsAutoLogin}
              />
              로그인 유지
            </label>
          </div>
          <div className={styles.form__error}>
            {isMobile && (isError || !!isFormError) && (
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
            )}
          </div>

        </form>
      </div>
      {loginErrorStatus === 403 && <ApprovalModal />}
    </div>
  );
}
