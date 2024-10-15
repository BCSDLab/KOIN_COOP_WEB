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
      <button
        type="button"
        className={styles['button-container']}
        onClick={openModal}
      >
        <ExcelIcon className={styles['exel-icon']} />
        식단 파일 다운로드
        <DownloadIcon className={styles['download-button']} />
      </button>
      {isModalOpen && <DownloadModal closeModal={closeModal} />}
    </>
  );
}
