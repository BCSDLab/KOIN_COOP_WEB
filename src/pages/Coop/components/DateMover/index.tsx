import ArrowLeftIcon from 'assets/svg/common/arrow-left.svg?react';
import ArrowRightIcon from 'assets/svg/common/arrow-right.svg?react';

import styles from './DateMover.module.scss';

interface DateMoverProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  onTodayClick: () => void;
}

export default function DateMover({ onPrevClick, onNextClick, onTodayClick }: DateMoverProps) {
  return (
    <div className={styles['button-container']}>

      <div
        role="button"
        tabIndex={0}
        onClick={onPrevClick}
        onKeyDown={onPrevClick}
        aria-label="이전 버튼"
      >
        <ArrowLeftIcon className={styles['button-prev']} />
      </div>

      <div
        className={styles['button-today']}
        role="button"
        tabIndex={0}
        onClick={onTodayClick}
        onKeyDown={onTodayClick}
        aria-label="오늘 버튼"
      >
        오늘
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onNextClick}
        onKeyDown={onNextClick}
        aria-label="다음 버튼"
      >
        <ArrowRightIcon className={styles['button-next']} />
      </div>

    </div>
  );
}
