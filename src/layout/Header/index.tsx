// import Search from 'assets/svg/auth/search-glasses.svg?react';
import { Link } from 'react-router-dom';

import Logo from 'assets/svg/common/koin-logo.svg?react';
import Setting from 'assets/svg/main/gear.svg?react';

import styles from './Header.module.scss';

function Header() {
  return (
    <header
      className={styles.header}
    >
      <Logo />
      <nav className={styles.header__content}>
        {/* <Search /> */}
        <Link to="/setting">
          <Setting />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
