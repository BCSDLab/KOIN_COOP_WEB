import { useEffect } from 'react';

import useBooleanState from 'hooks/useBooleanState';

const useMobileSidebar = (pathname: string, isMobile: boolean) => {
  const {
    value: isExpanded, setTrue: expandSidebar, setFalse: hideSidebar,
  } = useBooleanState(false);

  useEffect(() => {
    if (!isMobile) {
      hideSidebar();
    }
  }, [hideSidebar, isMobile]);

  useEffect(() => {
    hideSidebar();
  }, [hideSidebar, pathname]);

  return {
    isExpanded,
    expandSidebar,
    hideSidebar,
  };
};

export default useMobileSidebar;
