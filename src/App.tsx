import {
  Route, Routes, Navigate, Outlet,
} from 'react-router-dom';

import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import Coop from 'pages/Coop';
import Login from 'pages/Login';
import { useCoopMe } from 'query/auth';

function ProtectedRoute() {
  const { user, isLoading } = useCoopMe();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}

function PublicRoute() {
  const { user, isLoading } = useCoopMe();
  if (isLoading) return <div>Loading...</div>;
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
