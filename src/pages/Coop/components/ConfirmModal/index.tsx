import { useEffect, useCallback } from 'react';

import { Dining } from 'models/dinings';
import cn from 'utils/className';

import SoldOutMessage from '../SoldOutMessage/SoldOutMessage';

import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
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
}: ConfirmModalProps) {
  useEffect(() => {
    document.body.style.cssText = `
    overflow: hidden;`;

    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
      >
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
            onClick={confirm}
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
