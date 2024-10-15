import { Link } from 'react-router-dom';

import Menu from 'assets/svg/auth/menu.svg?react';
import Logo from 'assets/svg/common/koin-logo.svg?react';
import useBooleanState from 'hooks/useBooleanState';
import useMediaQuery from 'hooks/useMediaQuery';

import styles from './Header.module.scss';
import HeaderNavigation from './HeaderNavigation';
import MobileDropdown from './MobileDropdown';

function Header() {
  const { isMobile } = useMediaQuery();
  const [isOpen,,,, toggleIsOpen] = useBooleanState(false);

  return (
    <header className={styles.header}>
      <Logo className={styles.logo__icon} />
      <nav className={styles.header__content}>
        {isMobile ? (
          <div>
            <ul>
              <div className={styles['menu-container']}>
                {/* 월간조회 기능 추가 시 활성화 */}
                {/* <SearchIcon className={styles.search} /> */}
                <button
                  type="button"
                  onClick={toggleIsOpen}
                  className={styles['menu-icon']}
                  style={{ position: 'relative' }}
                  aria-label="메뉴 버튼"
                >
                  <Menu className={styles.menu} />
                </button>
                <MobileDropdown view={isOpen} />
              </div>
            </ul>
            <Link to="/setting" />
          </div>
        ) : (
          <HeaderNavigation />
        )}
      </nav>
    </header>
  );
}

export default Header;
