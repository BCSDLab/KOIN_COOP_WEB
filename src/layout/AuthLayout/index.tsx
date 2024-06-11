import Copyright from 'component/common/Copyright';

import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <div className={styles.template}>
      <Outlet />
      <Copyright />
    </div>
  );
}
