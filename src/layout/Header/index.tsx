import Search from 'assets/svg/auth/search-glasses.svg?react';
import Logo from 'assets/svg/common/koin-logo.svg?react';
import Setting from 'assets/svg/main/gear.svg?react';

import styles from './Header.module.scss';
import MobilePanel from './MobilePanel';

function Header() {
  return (
    <header
      className={styles.header}
    >
      <Logo />
      <nav className={styles.header__content}>
        <Search />
        <Setting />
      </nav>
      {/* <Suspense fallback={<div />}>
          <MobilePanel />
        </Suspense> */}
    </header>
  );
}

export default Header;
