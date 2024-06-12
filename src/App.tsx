import { Suspense, useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import useErrorBoundary from 'hooks/useErrorBoundary';
import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import Coop from 'pages/Coop';
import Login from 'pages/Login';
import useUserTypeStore from 'store/useUserTypeStore';

function App() {
  const navigate = useNavigate();
  const { userType } = useUserTypeStore();

  useEffect(() => {
    if (!userType) {
      navigate('/login', { replace: true });
    }
  }, [userType, navigate]);

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
