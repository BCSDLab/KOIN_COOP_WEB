import { useEffect } from 'react';

import useBooleanState from 'hooks/useBooleanState';

const useMobileMenu = (pathname: string, isMobile: boolean) => {
  const [isExpanded, , openMenu, closeMenu] = useBooleanState(false);

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [closeMenu, isMobile]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, pathname]);

  return {
    isMenuOpen: isExpanded,
    openMenu,
    closeMenu,
  };
};

export default useMobileMenu;
