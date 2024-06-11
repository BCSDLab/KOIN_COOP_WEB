import { useEffect } from 'react';

import Header from 'component/Header';
import useErrorBoundary from 'hooks/useErrorBoundary';
import usePrevPathStore from 'store/path';
import useUserStore from 'store/user';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const setPrevPath = usePrevPathStore((state) => state.setPrevPath);
  const location = useLocation();
  const { handleErrorBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!user) {
      setUser()
        .catch((e) => handleErrorBoundary(e))
        .catch(() => {
          setPrevPath('/login');
          navigate('/login');
        });
    }
  }, [handleErrorBoundary, setUser, setPrevPath, navigate, user]);

  return (
    <div>
      {user && (
        <>
          {location.pathname !== '/owner/shop-registration' && <Header />}
          <Outlet />
        </>
      )}
    </div>
  );
}
