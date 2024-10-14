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

      <button type="button" onClick={onPrevClick} aria-label="이전 버튼">
        <ArrowLeftIcon className={styles['button-prev']} />
      </button>

      <button
        className={styles['button-today']}
        type="button"
        onClick={onTodayClick}
        aria-label="오늘 버튼"
      >
        오늘
      </button>

      <button type="button" onClick={onNextClick} aria-label="이전 버튼">
        <ArrowRightIcon className={styles['button-next']} />
      </button>

    </div>
  );
}
