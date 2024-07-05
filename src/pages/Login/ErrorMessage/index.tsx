import WarningIcon from 'assets/svg/auth/warning.svg?react';
import { useErrorMessageStore } from 'store/useErrorMessageStore';

import styles from './ErrorMessage.module.scss';

const MESSAGE = {
  id: '아이디를 입력해주세요.',
  password: '비밀번호를 입력해주세요.',
};

interface ErrorMessageProps {
  type: 'id' | 'password';
}

export default function ErrorMessage({ type }: ErrorMessageProps) {
  const { loginErrorMessage } = useErrorMessageStore();
  const message = loginErrorMessage || MESSAGE[type];
  if (type === 'id' && loginErrorMessage) return null;

  return (
    <div className={styles.error__box}>
      <WarningIcon />
      &nbsp;
      <span className={styles.error__message}>{message}</span>
    </div>
  );
}
