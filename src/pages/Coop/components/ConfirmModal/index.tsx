import { useEffect } from 'react';

import { Dining } from 'models/dinings';
import cn from 'utils/className';

import SoldOutMessage from '../SoldOutMessage/SoldOutMessage';

import styles from './ConfirmModal.module.scss';

interface Props {
  dining: Dining;
  isOperating: boolean;
  closeModal: () => void;
  confirm: () => void;
}

export default function ConfirmModal({
  dining,
  isOperating,
  closeModal,
  confirm,
}: Props) {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <SoldOutMessage isOperating={isOperating} dining={dining} />
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={closeModal}
            className={styles.buttons__close}
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => confirm()}
            className={cn({
              [styles.buttons__confirm]: true,
              [styles['buttons__confirm--not-operating']]: !isOperating,
            })}
          >
            {dining.soldout_at ? '품절취소' : '품절설정'}
          </button>
        </div>
      </div>
    </div>
  );
}
