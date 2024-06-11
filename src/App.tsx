import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import Coop from 'page/Coop';
import Login from 'page/Login';

function App() {
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
