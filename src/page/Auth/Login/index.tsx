import { useState } from 'react';

import BlindIcon from 'assets/svg/auth/blind.svg?react';
import Logo from 'assets/svg/auth/koin-logo.svg?react';
// import LockIcon from 'assets/svg/auth/lock.svg?react';
import ShowIcon from 'assets/svg/auth/show.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import useMediaQuery from 'hooks/useMediaQuery';
import { LoginParams } from 'model/auth';
import { useLogin } from 'query/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import cn from 'utils/ts/className';
import sha256 from 'utils/ts/sha256';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
// 이 컴포넌트의 주석은 당장 생협 기능에 필요 없는 부분이므로 주석 처리했습니다.
// import { Link, useNavigate } from 'react-router-dom';

import ApprovalModal from './ApprovalModal';
import styles from './Login.module.scss';
// import OPTION from './static/option';

export default function Login() {
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState();
  const { value: isAutoLogin, changeValue: changeIsAutoLogin } = useBooleanState(true);
  const { isMobile } = useMediaQuery();
  const { login, isError: isServerError } = useLogin();
  const [isFormError, setIsFormError] = useState(false);
  // const navigate = useNavigate();
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
    login({ email: data.email, password: hashedPassword, isAutoLogin });
  };

  const onError = (error: FieldErrors<LoginParams>) => {
    setIsFormError(true);
    if (error.email) {
      setEmailError(error.email?.message || '');
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
              placeholder="아이디 입력"
              {...register('email')}
            />
          </div>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type={isBlind ? 'text' : 'password'}
              placeholder="비밀번호 입력"
              {...register('password')}
            />
            <button
              type="button"
              className={styles.form__icon}
              onClick={changeIsBlind}
            >
              {isBlind ? <ShowIcon aria-hidden /> : <BlindIcon aria-hidden />}
            </button>
          </div>
          <div className={styles['form__auto-login']}>
            {(isError || !!isFormError) && (
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
            )}
            <label className={styles['form__auto-login__label']} htmlFor="auto-login">
              <input
                className={styles['form__auto-login__checkbox']}
                type="checkbox"
                id="auto-login"
                defaultChecked
                onChange={changeIsAutoLogin}
              />
              자동로그인
            </label>
          </div>
          <div className={styles.form__error}>
            {isMobile && (isError || !!isFormError) && (
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
            )}
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
          {/* {isMobile && (
            <button
              className={styles.form__button}
              type="button"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          )}
          <div className={styles.option}>
            {isMobile
              ? (
                <Link to={OPTION[1].path} className={styles.option__link}>
                  <LockIcon aria-hidden />
                  {OPTION[1].name}
                </Link>
              )
              : OPTION.map((option) => (
                <Link to={option.path} key={option.name} className={styles.option__link}>
                  {option.name}
                </Link>
              ))}
          </div> */}
        </form>
      </div>
      {loginErrorStatus === 403 && <ApprovalModal />}
    </div>
  );
}
