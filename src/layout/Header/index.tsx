import Logo from 'assets/svg/common/koin-logo.svg?react';
import Setting1 from 'pages/Coop/components/Setting';

import styles from './Header.module.scss';

function Header() {
  return (
    <header
      className={styles.header}
    >
      <Logo />
      <nav className={styles.header__content}>
        <Setting1 />
      </nav>
    </header>
  );
}

export default Header;
