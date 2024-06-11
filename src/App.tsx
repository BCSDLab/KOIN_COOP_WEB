import { Suspense } from 'react';

import Toast from 'component/common/Toast';
import AuthLayout from 'layout/AuthLayout';
import CoopLayout from 'layout/CoopLayout';
import DefaultLayout from 'layout/DefaultLayout';
import { UserType } from 'model/auth';
import CompleteChangePassword from 'page/Auth/FindPassword/CompleteChangePassword';
import NewPassword from 'page/Auth/FindPassword/NewPassword';
import FindPassword from 'page/Auth/FindPassword/SendAuthNumber';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import Coop from 'page/Coop';
import PageNotFound from 'page/Error/PageNotFound';
import useUserTypeStore from 'store/useUserTypeStore';

import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

interface ProtectedRouteProps {
  userTypeRequired: UserType;
}

function ProtectedRoute({ userTypeRequired }: ProtectedRouteProps) {
  const { userType, updateUserType } = useUserTypeStore();
  updateUserType();

  if (userType !== userTypeRequired) {
    if (userType === 'COOP') {
      return <Navigate to="/coop" replace />;
    }
    if (userType === null) {
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Coop />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/complete-change-password" element={<CompleteChangePassword />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
