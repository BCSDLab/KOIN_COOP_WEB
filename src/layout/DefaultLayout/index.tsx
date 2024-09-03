import { Outlet } from 'react-router-dom';

import Header from 'layout/Header';

import styles from './DefaultLayout.module.scss';

export default function DefaultLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
