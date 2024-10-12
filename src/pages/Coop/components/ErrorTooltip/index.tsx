import React, { useEffect, useState } from 'react';
import styles from './ErrorTooltip.module.scss';
import InfoIcon from 'assets/svg/common/info.svg?react';

interface ErrorTooltipProps {
  errorCode: number | null;
  onHide: () => void;
}

const ErrorTooltip: React.FC<ErrorTooltipProps> = ({ errorCode, onHide }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (errorCode !== null) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onHide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorCode, onHide]);

  const getErrorMessage = () => {
    switch (errorCode) {
      case 1:
        return '오늘 날짜 이후 기간은 설정할 수 없어요.';
      case 2:
        return '2022/11/29 식단부터 다운받을 수 있어요.';
      case 3:
        return '시작일은 종료일 이전으로 설정해주세요.';
      default:
        return null;
    }
  };

  const errorMessage = getErrorMessage();

  if (!errorMessage || !visible) return null;

  return (
    <div className={styles.tooltip}>
      <InfoIcon className={styles['icon-tooltip']} />
      <span className={styles.message}>{errorMessage}</span> {/* 메시지 */}
    </div>
  );
};

export default ErrorTooltip;
