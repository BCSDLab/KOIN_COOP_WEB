import { Link } from 'react-router-dom';

import { useLogout } from 'query/auth';

import styles from './Setting.module.scss';

function Setting1() {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <Link className={styles['setting-item__link']} to="https://forms.gle/wqD6PkjZoaaHJ1bo8" target="_blank" rel="noopener noreferrer">
        <span>BCSD Lab에 문의하기</span>
      </Link>
      <button type="button" className={styles['setting-item__button']} onClick={handleLogout}>
        <span className={styles['setting-item__warning']}>로그아웃</span>
      </button>
    </div>
  );
}

export default Setting1;
