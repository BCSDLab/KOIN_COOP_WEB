import { Link, useLocation, useNavigate } from 'react-router-dom';

import BackArrowIcon from 'assets/svg/common/back-arrow.svg?react';
import MenuIcon from 'assets/svg/common/hamburger-menu.svg?react';
import MobileLogoIcon from 'assets/svg/common/mobile-koin-logo.svg?react';
import useMediaQuery from 'hooks/useMediaQuery';
import useMobileSidebar from 'layout/Header/hooks/useMobileSidebar';
import { CATEGORY_COOP, HeaderCategory } from 'models/headerCategory';
import { useLogout } from 'query/auth';
import usePrevPathStore from 'store/usePrevPathStore';
import useUserStore from 'store/useUserStore';
import cn from 'utils/className';

import { createPortal } from 'react-dom';

import styles from './MobilePanel.module.scss';

interface PanelContentProps {
  hideSidebar: () => void;
  category: HeaderCategory;
}

function PanelContent({ hideSidebar, category }: PanelContentProps) {
  const navigate = useNavigate();
  const { title, submenu } = category;

  const handleClick = (link: string) => {
    navigate(link);
    hideSidebar();
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();
  const { user } = useUserStore();

  const { setPrevPath } = usePrevPathStore();
  const { logout } = useLogout();

  const {
    isExpanded: isMobileSidebarExpanded,
    expandSidebar,
    hideSidebar,
  } = useMobileSidebar(pathname, isMobile);

  const handleLogout = async () => {
    logout(undefined, {
      onSettled: () => {
        setPrevPath('/login');
        navigate('/login');
      },
    });
  };

  return (
    <>
      <div
        className={styles['mobile-header']}
      >
        <span className={styles['mobile-header__title']}>
          {pathname === '/' ? (
            <MobileLogoIcon title="코인 로고" />
          ) : (CATEGORY_COOP
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
          onClick={expandSidebar}
          aria-expanded={isMobileSidebarExpanded}
        >
          <MenuIcon title="메뉴" />
        </button>
      </div>
      {createPortal(
        (
          <nav className={cn({
            [styles['mobile-header__panel']]: true,
            [styles['mobile-header__panel--logged-in']]: true,
            [styles['mobile-header__panel--show']]: isMobileSidebarExpanded,
          })}
          >
            <div className={styles['mobile-header__user']}>
              <button
                type="button"
                aria-label="뒤로 가기 버튼"
                className={styles['mobile-header__backspace']}
                onClick={hideSidebar}
              >
                <BackArrowIcon title="뒤로 가기 버튼" />
              </button>
              <div className={styles['mobile-header__greet']}>
                {user?.name}
                <span>님, 안녕하세요!</span>
              </div>
              <ul className={styles['mobile-header__auth-menu']}>
                <li className={styles['mobile-header__my-info']}>
                  <Link to="/">
                    내 정보
                  </Link>
                </li>
                <li className={styles['mobile-header__link']}>
                  <button type="button" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>

            {CATEGORY_COOP.map((category: HeaderCategory) => (
              <PanelContent
                key={category.title}
                hideSidebar={hideSidebar}
                category={category}
              />
            ))}

            <img
              className={cn({
                [styles['mobile-header__logo']]: true,
                [styles['mobile-header__logo--bcsd']]: true,
              })}
              src="http://static.koreatech.in/assets/img/ic-bcsd_gray.png"
              alt="bcsd lab logo"
              title="bcsd lab logo"
            />
            <img
              className={cn({
                [styles['mobile-header__logo']]: true,
                [styles['mobile-header__logo--koin']]: true,
              })}
              src="http://static.koreatech.in/assets/img/rectangle_icon.png"
              alt="KOIN service logo"
              title="bcsd lab logo"
            />
          </nav>
        ),
        document.body,
      )}
    </>
  );
}
