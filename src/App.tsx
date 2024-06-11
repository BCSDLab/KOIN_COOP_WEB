import { Suspense } from 'react';

import Toast from 'component/common/Toast';
import AuthLayout from 'layout/AuthLayout';
import CoopLayout from 'layout/CoopLayout';
import OwnerLayout from 'layout/OwnerLayout';
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
        <Route element={<ProtectedRoute userTypeRequired="COOP" />}>
          <Route path="/coop" element={<CoopLayout />}>
            <Route path="/coop" element={<Coop />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired={null} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/find-id" element={<PageNotFound />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Route>
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/complete-change-password" element={<CompleteChangePassword />} />
        </Route>
      </Routes>
      <Toast />
      <LogPage />
    </Suspense>
  );
}

export default App;
