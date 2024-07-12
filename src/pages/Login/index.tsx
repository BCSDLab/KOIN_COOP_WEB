import { useState } from 'react';

import BlindIcon from 'assets/svg/auth/blind.svg?react';
import KoinLogo from 'assets/svg/auth/koin-logo.svg?react';
import ShowIcon from 'assets/svg/auth/show.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import { useScrollLock } from 'hooks/useScrollLock';
import { useLogin } from 'query/auth';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import cn from 'utils/className';
import sha256 from 'utils/sha256';

import ErrorMessage from './ErrorMessage';
import styles from './Login.module.scss';

const INQUIRY_LINK = 'https://docs.google.com/forms/d/1_pTvL-9Zo1f9cebi_J_8WFSa1Oj8tcEL_nh9IavsSaU/edit';

export default function Login() {
  const { login } = useLogin();
  const { isLoginError, setIsLoginError } = useErrorMessageStore();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isBlind,,,, changeIsBlind] = useBooleanState();
  const [isAutoLogin,,,, changeIsAutoLogin] = useBooleanState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashedPassword = await sha256(password);
    login({ id, password: hashedPassword, isAutoLogin });
    setPassword('');
  };

  useScrollLock({ autoLock: true });

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <KoinLogo className={styles.logo} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={cn({
            [styles.form__wrapper]: true,
            [styles['form__wrapper--error']]: isLoginError,
          })}
          >
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isLoginError,
              })}
              type="text"
              placeholder="아이디를 입력하세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={() => setIsLoginError(false)}
            />
          </div>
          {isLoginError && <ErrorMessage type="id" />}
          <div className={cn({
            [styles.form__wrapper]: true,
            [styles['form__wrapper--error']]: isLoginError,
          })}
          >
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input-password']]: true,
              })}
              type={isBlind ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsLoginError(false)}
            />
            <button
              type="button"
              className={styles['form__blind-icon']}
              onClick={changeIsBlind}
            >
              {isBlind ? <ShowIcon aria-hidden /> : <BlindIcon aria-hidden />}
            </button>
          </div>
          {isLoginError && <ErrorMessage type="password" />}
          <button
            className={cn({
              [styles['form__login-button']]: true,
            })}
            type="submit"
            disabled={!id || !password}
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
