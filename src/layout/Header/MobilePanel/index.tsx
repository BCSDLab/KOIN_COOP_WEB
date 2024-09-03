import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import BackArrowIcon from 'assets/svg/common/back-arrow.svg?react';
import MenuIcon from 'assets/svg/common/hamburger-menu.svg?react';
import MobileLogoIcon from 'assets/svg/common/mobile-koin-logo.svg?react';
import useMediaQuery from 'hooks/useMediaQuery';
import useMobileMenu from 'layout/Header/hooks/useMobileMenu';
import { HEADER_CATEGORY, HeaderCategory } from 'models/headerCategory';
import { useCoopMe, useLogout } from 'query/auth';
import cn from 'utils/className';

import { createPortal } from 'react-dom';

import styles from './MobilePanel.module.scss';

interface PanelContentProps {
  closeMenu: () => void;
  category: HeaderCategory;
}

function PanelContent({ closeMenu, category }: PanelContentProps) {
  const navigate = useNavigate();
  const { title, submenu } = category;

  const handleClick = (link: string) => {
    navigate(link);
    closeMenu();
  };

  return (
    <div>
      <div className={styles.category__title}>
        {title}
      </div>
      <div className={styles.category__submenus}>
        {submenu.map((subMenu) => (
          <button
            key={subMenu.title}
            type="button"
            className={styles.category__submenu}
            onClick={() => handleClick(subMenu.link)}
          >
            {subMenu.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MobilePanel() {
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();
  const { user } = useCoopMe();
  const { logout } = useLogout();
  const [transitionPrevented, setTransitionPrevented] = useState(false);

  const {
    isMenuOpen: isMobileMenuOpen, openMenu, closeMenu,
  } = useMobileMenu(pathname, isMobile);

  const handleMenuClick = () => {
    window.history.pushState({ menuOpen: true }, '');
    openMenu();
    setTimeout(() => setTransitionPrevented(true), 300);
  };

  const handleMenuClose = () => {
    setTransitionPrevented(false);
    closeMenu();
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isMobileMenuOpen) {
        event.preventDefault();
        closeMenu();
        setTimeout(() => setTransitionPrevented(false), 300);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isMobileMenuOpen, closeMenu]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.cssText = 'overflow: hidden;';
    } else {
      document.body.style.cssText = '';
    }

    return () => {
      document.body.style.cssText = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className={styles['mobile-header']}
      >
        <span className={styles['mobile-header__title']}>
          {pathname === '/' ? (
            <MobileLogoIcon title="코인 로고" />
          ) : (HEADER_CATEGORY
            .flatMap((categoryValue) => categoryValue.submenu)
            .find((subMenuValue) => subMenuValue.link === pathname)
            ?.title ?? ''
          )}
        </span>
        <button
          type="button"
          aria-label="메뉴 버튼"
          className={cn({
            [styles['mobile-header__icon']]: true,
            [styles['mobile-header__icon--right']]: true,
          })}
          onClick={handleMenuClick}
          aria-expanded={isMobileMenuOpen}
        >
          <MenuIcon title="메뉴" />
        </button>
      </div>
      {createPortal(
        (
          <nav className={cn({
            [styles['mobile-header__panel']]: true,
            [styles['mobile-header__panel--logged-in']]: true,
            [styles['mobile-header__panel--show']]: isMobileMenuOpen,
            [styles['mobile-header__panel--transition-prevented']]: transitionPrevented,
          })}
          >
            <div className={styles['mobile-header__user']}>
              <button
                type="button"
                aria-label="뒤로 가기 버튼"
                className={styles['mobile-header__backspace']}
                onClick={handleMenuClose}
              >
                <BackArrowIcon title="뒤로 가기 버튼" />
              </button>

              <div className={styles['mobile-header__greet']}>
                {user?.name}
                <span>님, 안녕하세요!</span>
              </div>

              <ul className={styles['mobile-header__auth-menu']}>
                {/* <li className={styles['mobile-header__my-info']}>
                  <Link to="/">
                    내 정보
                  </Link>
                </li> 24.7.11 내 정보 임시 삭제 */}
                <li className={styles['mobile-header__link']}>
                  <button type="button" onClick={() => logout()}>
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>

            {HEADER_CATEGORY.map((category: HeaderCategory) => (
              <PanelContent
                key={category.title}
                closeMenu={closeMenu}
                category={category}
              />
            ))}
          </nav>
        ),
        document.body,
      )}
    </>
  );
}
