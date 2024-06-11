import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Toast from 'component/common/Toast';
import AuthLayout from 'layout/AuthLayout';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'page/Auth/Login';
import Coop from 'page/Coop';
// import CompleteChangePassword from 'page/Auth/FindPassword/CompleteChangePassword';
// import NewPassword from 'page/Auth/FindPassword/NewPassword';
// import FindPassword from 'page/Auth/FindPassword/SendAuthNumber';
// import Signup from 'page/Auth/Signup';

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Coop />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/find-password" element={<FindPassword />} /> */}
          {/* <Route path="/new-password" element={<NewPassword />} /> */}
          {/* <Route path="/complete-change-password" element={<CompleteChangePassword />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
