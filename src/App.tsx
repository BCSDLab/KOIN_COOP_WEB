import { Suspense } from 'react';

import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import CompleteChangePassword from 'page/Auth/FindPassword/CompleteChangePassword';
import NewPassword from 'page/Auth/FindPassword/NewPassword';
import FindPassword from 'page/Auth/FindPassword/SendAuthNumber';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import Coop from 'page/Coop';

import { Route, Routes } from 'react-router-dom';

export default function App() {
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
