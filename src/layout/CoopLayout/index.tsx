import Header from 'component/common/Header';

import { Outlet } from 'react-router-dom';

export default function CoopLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
