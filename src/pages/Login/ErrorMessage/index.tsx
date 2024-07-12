import WarningIcon from 'assets/svg/auth/warning.svg?react';
import { useErrorMessageStore } from 'store/useErrorMessageStore';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  type: 'id' | 'password';
}

const ERROR_MESSAGES: Record<number, string> = {
  400: '비밀번호가 올바르지 않습니다.',
  404: '아이디가 올바르지 않습니다.',
  403: '관리자 승인 대기 중입니다.',
  500: '서버 오류가 발생했습니다.',
};

export default function ErrorMessage({ type }: ErrorMessageProps) {
  const { loginErrorStatus } = useErrorMessageStore();

  if (!loginErrorStatus) return null;

  const message = ERROR_MESSAGES[loginErrorStatus] || '로그인을 실패했습니다.';

  if ((loginErrorStatus === 404 && type !== 'id') || (loginErrorStatus === 400 && type !== 'password')) {
    return null;
  }

  return (
    <div className={styles.error__box}>
      <WarningIcon />
      &nbsp;
      <span className={styles.error__message}>{message}</span>
    </div>
  );
}
