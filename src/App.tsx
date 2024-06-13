import { Suspense, useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import Coop from 'pages/Coop';
import Login from 'pages/Login';
import useUserStore from 'store/useUserStore';

function App() {
  const { isAuthenticated, initializeAuth } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, initializeAuth, navigate]);

  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Coop />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
