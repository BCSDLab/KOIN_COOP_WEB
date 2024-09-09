import {
  Route, Routes, Navigate, Outlet,
} from 'react-router-dom';

import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import Coop from 'pages/Coop';
import Login from 'pages/Login';
import Setting from 'pages/Setting';
import { useCoopMe } from 'query/auth';

function ProtectedRoute() {
  const { user, isLoading } = useCoopMe();
  if (isLoading) return <div />;
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}

function PublicRoute() {
  const { user, isLoading } = useCoopMe();
  if (isLoading) return <div />;
  if (user) return <Navigate to="/" />;
  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Coop />} />
        </Route>
        <Route path="/setting" element={<Setting />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
