import { useState } from 'react';

import DownloadIcon from 'assets/svg/common/download.svg?react';
import ExcelIcon from 'assets/svg/common/excel.svg?react';
import DownloadModal from 'pages/Coop/components/DownloadModal';

import styles from './DiningDownload.module.scss';

export default function DiningDownload() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={styles['button-container']}
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={openModal}
      >
        <ExcelIcon className={styles['exel-icon']} />
        <div className={styles['dining-download-button']}>식단 파일 다운로드</div>
        <DownloadIcon className={styles['download-button']} />
      </div>
      {isModalOpen && <DownloadModal closeModal={closeModal} />}
    </>
  );
}
