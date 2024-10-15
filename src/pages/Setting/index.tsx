import { Link, useNavigate } from 'react-router-dom';

import ArrowDown from 'assets/svg/common/arrow-down.svg?react';
import Copyright from 'layout/Copyright';
import { useLogout } from 'query/auth';

import styles from './Setting.module.scss';

function Setting() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const navigateToPrevPage = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button aria-label="뒤로가기" type="button" onClick={navigateToPrevPage} className={styles['prev-button']}>
          <ArrowDown className={styles['prev-icon']} />
        </button>
      </header>

      <h1 className={styles.title}>설정</h1>

      <h3 className={styles['sub-title']}>일반</h3>
      <Link className={styles['setting-item__link']} to="https://forms.gle/wqD6PkjZoaaHJ1bo8" target="_blank" rel="noopener noreferrer">
        <span>BCSD Lab에 문의하기</span>
        <ArrowDown />
      </Link>
      <button type="button" className={styles['setting-item__button']} onClick={handleLogout}>
        <span className={styles['setting-item__warning']}>로그아웃</span>
      </button>
      <div className={styles['bottom-description']}>
        <div>항상 맛있는 식단 감사합니다 💖</div>
        <div>사랑을 담아, BCSD Lab 캠퍼스팀이 만들었습니다.</div>
      </div>
      <Copyright />
    </div>
  );
}

export default Setting;
