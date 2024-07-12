import styles from './Copyright.module.scss';

export default function Copyright() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.copyright}>
      {`Copyright ${year}. BCSD Lab. All rights reserved.`}
    </div>
  );
}
