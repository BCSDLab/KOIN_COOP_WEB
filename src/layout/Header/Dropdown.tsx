import { Link } from 'react-router-dom';
import styles from './Dropdown.module.scss';
import { useLogout } from 'query/auth';

function Dropdown() {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className={styles.container}>
        <Link className={styles['setting-item__link']} to="https://forms.gle/wqD6PkjZoaaHJ1bo8" target="_blank" rel="noopener noreferrer">
          <div className={styles['setting-item__word']}>BCSD Lab에 문의하기</div>
        </Link>
        <button type="button" className={styles['setting-item__button']} onClick={handleLogout}>
          <div className={styles['setting-item__warning']}>로그아웃</div>
        </button>
    </div>
    </>
  );
}

export default Dropdown;