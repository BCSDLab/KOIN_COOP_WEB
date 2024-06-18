import { Suspense } from 'react';

import useMediaQuery from 'hooks/useMediaQuery';

import styles from './Header.module.scss';
import MobilePanel from './MobilePanel';
import PCPanel from './PCPanel';

function Header() {
  const { isMobile } = useMediaQuery();

  return (
    <header
      className={styles.header}
    >
      <nav className={styles.header__content}>
        {isMobile ? (
          <Suspense fallback={<div />}>
            <MobilePanel />
          </Suspense>
        ) : (
          <PCPanel />
        )}
      </nav>
    </header>
  );
}

export default Header;
