import { Link } from 'react-router-dom';
import Logo from 'assets/svg/common/koin-logo.svg?react';
import Setting1 from 'pages/Coop/components/Setting';
import useMediaQuery from 'hooks/useMediaQuery';
import styles from './Header.module.scss';
import SearchIcon from 'assets/svg/auth/search-icon.svg?react';
import Menu from 'assets/svg/auth/menu.svg?react';
import { useState } from 'react';
import Dropdown from './Dropdown';

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
                <SearchIcon className={styles['search']} />
                <div
                  onClick={() => setView(!view)}
                  className={styles['menu-icon']}
                  style={{ position: 'relative' }} // 헤더 내부 요소 기준으로 위치 설정
                >
                  <Menu className={styles['menu']} />
                </div>
                {view && <Dropdown />} {/* 드롭다운을 아래로 위치시키기 */}
              </div>
            </ul>

            <Link to="/setting"></Link>
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
