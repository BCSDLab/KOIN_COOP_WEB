import { useEffect } from 'react';

import CustomButton from 'components/CustomButton';
import cn from 'utils/className';

import { createPortal } from 'react-dom';

import styles from './SoldoutModal.module.scss';

interface Props {
  buttonText?: string;
  modalSize: string;
  hasFooter: boolean;
  isOpen: boolean;
  isOverflowVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode
}

export default function SoldOutModal({
  buttonText = '', modalSize, hasFooter, isOpen, isOverflowVisible, onCancel, children,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div className={styles.modal}>
      <div
        className={cn({
          [styles[`container__${modalSize}`]]: true,
          [styles[`container__${modalSize}--visible`]]: isOverflowVisible,
        })}
      >
        <div className={styles.content}>
          {children}
        </div>
        {hasFooter && (
          <div className={styles.container__footer}>
            <CustomButton content={buttonText} buttonSize="large" onClick={onCancel} />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
