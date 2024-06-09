import { Suspense } from 'react';

import BackArrowIcon from 'assets/svg/common/back-arrow.svg?react';
import useMediaQuery from 'hooks/useMediaQuery';

import { useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import MobilePanel from './MobilePanel';
import PCPanel from './PCPanel';

function Header() {
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();

  if ((pathname === '/owner/add-menu'
    || pathname.startsWith('/owner/modify-menu/')
    || pathname.startsWith('/owner/event-add/'))
    && isMobile) {
    return (
      <header className={styles['add-menu-header']}>
        <button
          type="button"
          aria-label="뒤로 가기 버튼"
          className={styles['add-menu-header__prev-button']}
          onClick={() => window.history.back()}
        >
          <BackArrowIcon title="뒤로 가기 버튼" />
        </button>
        <div className={styles['add-menu-header__caption']}>
          {pathname === '/owner/add-menu' && '메뉴추가'}
          {pathname.startsWith('/owner/modify-menu/') && '메뉴수정'}
          {pathname.startsWith('/owner/event-add/') && '이벤트/공지 작성하기'}
        </div>
      </header>
    );
  }

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
