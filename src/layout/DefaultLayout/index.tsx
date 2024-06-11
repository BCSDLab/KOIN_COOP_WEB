import Header from 'component/Header';

import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
