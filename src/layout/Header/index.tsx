import { useState } from 'react';

import { Link } from 'react-router-dom';

import Menu from 'assets/svg/auth/menu.svg?react';
import SearchIcon from 'assets/svg/auth/search-icon.svg?react';
import Logo from 'assets/svg/common/koin-logo.svg?react';
import useMediaQuery from 'hooks/useMediaQuery';
import Setting1 from 'pages/Coop/components/Setting';

import styles from './Header.module.scss';
import MobileDropdown from './MobileDropdown';

function Header() {
  const { isMobile } = useMediaQuery();
  const [view, setView] = useState(false);

  return (
    <header className={styles.header}>
      <Logo className={styles.logo__icon} />
      <nav className={styles.header__content}>
        {isMobile ? (
          <div>
            <ul>
              <div className={styles['menu-container']}>
                <SearchIcon className={styles.search} />
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,
                jsx-a11y/click-events-have-key-events */}
                <div
                  onClick={() => setView(!view)}
                  className={styles['menu-icon']}
                  style={{ position: 'relative' }}
                >
                  <Menu className={styles.menu} />
                </div>
                {view && <MobileDropdown />}
              </div>
            </ul>

            <Link to="/setting" />
          </div>
        ) : (
          <div>
            <Setting1 />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
