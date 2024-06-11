import { Outlet } from 'react-router-dom';

import Copyright from 'components/Copyright';

import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <div className={styles.template}>
      <Outlet />
      <Copyright />
    </div>
  );
}