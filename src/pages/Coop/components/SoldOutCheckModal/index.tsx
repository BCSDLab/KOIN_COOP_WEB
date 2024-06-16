import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import styles from './SoldoutModal.module.scss';

interface Props {
  isOpen: boolean;
  children: React.ReactNode
}

export default function SoldOutCheckModal({
  isOpen, children,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
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
        className={styles.container__mobile}
      >
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
