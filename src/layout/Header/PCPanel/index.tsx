import { Link, useNavigate } from 'react-router-dom';

import LogoIcon from 'assets/svg/common/koin-logo.svg?react';
import useMegaMenu from 'layout/Header/hooks/useMegaMenu';
import { CATEGORY_COOP, HeaderCategory } from 'models/headerCategory';
import { useLogout } from 'query/auth';
import usePrevPathStore from 'store/usePrevPathStore';
import cn from 'utils/className';

import styles from './PCPanel.module.scss';

const ID: { [key: string]: string; } = {
  PANEL: 'mega-menu-panel',
  LABEL1: 'mega-menu-label-1',
  LABEL2: 'mega-menu-label-2',
};

interface Prop {
  categoryArray: HeaderCategory[];
}

function HeaderContent({ categoryArray }: Prop) {
  const {
    panelMenuList,
    isExpanded: isMegaMenuExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  } = useMegaMenu(categoryArray);

  return (
    <div
      className={cn({
        [styles['mega-menu']]: true,
        [styles['header__mega-menu']]: true,
      })}
      onBlur={hideMegaMenu}
      onMouseOut={hideMegaMenu}
    >
      <ul className={styles['mega-menu__trigger-list']}>
        {categoryArray.map((category) => (
          <li
            key={category.title}
          >
            <button
              className={styles['mega-menu__trigger']}
              tabIndex={0}
              type="button"
              onClick={createOnChangeMenu(category.title)}
              onFocus={createOnChangeMenu(category.title)}
              onBlur={hideMegaMenu}
              onMouseOver={createOnChangeMenu(category.title)}
              onMouseOut={hideMegaMenu}
              aria-expanded={isMegaMenuExpanded}
            >
              <span>
                {category.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        id={ID.PANEL}
        className={styles['mega-menu__panel']}
        onFocus={onFocusPanel}
        onMouseOver={onFocusPanel}
        aria-hidden={!isMegaMenuExpanded}
        aria-labelledby={Array.from({ length: 2 }, (_, index) => ID[`LABEL${index + 1}`]).join(' ')}
      >
        <ul className={styles['mega-menu__content']}>
          {panelMenuList?.map((menu) => (
            <li className={styles['mega-menu__menu']} key={menu.title}>
              <Link className={styles['mega-menu__link']} to={menu.link} onClick={hideMegaMenu}>
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PCPanel() {
  const navigate = useNavigate();

  const { setPrevPath } = usePrevPathStore();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        setPrevPath('/login');
        navigate('/login');
      },
    });
  };

  return (
    <>
      <Link
        className={styles.header__logo}
        to="/"
        tabIndex={0}
      >
        <LogoIcon title="코인 로고" />
      </Link>
      <HeaderContent categoryArray={CATEGORY_COOP} />

      <ul className={styles['header__auth-menu']}>
        <li className={styles['header__auth-link']}>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </>
  );
}
