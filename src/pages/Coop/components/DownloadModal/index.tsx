import { useState, useCallback } from 'react';

import Cancel from 'assets/svg/common/close.svg?react';
import ExcelDownload from 'assets/svg/common/excel-download.svg?react';
import LoadingSpinner from 'assets/svg/common/loading.svg?react';
import PhotoDownload from 'assets/svg/common/photo-download.svg?react';
import useExcelDownload from 'pages/Coop/hooks/useExcelDownload';
import useImageDownload from 'pages/Coop/hooks/useImageDownload';
import useValidateDates from 'pages/Coop/hooks/useValidateDates';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DateSelector from '../DateSelector';
import DownloadToggleButton from '../DownloadToggleButton';

import styles from './DownloadModal.module.scss';

interface DownloadModalProps {
  closeModal: () => void;
}

interface DateInput {
  year: number | '';
  month: number | '';
  day: number | '';
}

export default function DownloadModal({ closeModal }: DownloadModalProps) {
  const [startDate, setStartDate] = useState<DateInput>({ year: '', month: '', day: '' });
  const [endDate, setEndDate] = useState<DateInput>({ year: '', month: '', day: '' });
  const [isStudentCafeteriaOnly, setIsStudentCafeteriaOnly] = useState(false);
  const { isDownloading, downloadExcelAsync } = useExcelDownload();
  const { isDownloading: isImageDownloading, downloadImageAsync } = useImageDownload();
  const { validateDates } = useValidateDates();

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  const formatDate = (date: DateInput) => {
    if (!date.year || !date.month || !date.day) {
      return '';
    }
    return `${date.year.toString()}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
  };

  const handleDownloadExcel = async () => {
    if (!validateDates(startDate, endDate)) return;

    await downloadExcelAsync({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      isCafeteria: isStudentCafeteriaOnly,
    });

    closeModal();
  };

  const handleDownloadImage = async () => {
    if (!validateDates(startDate, endDate)) return;

    await downloadImageAsync({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      isCafeteria: isStudentCafeteriaOnly,
    });

    closeModal();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div className={styles.container} role="dialog" aria-modal="true">
        <div className={styles.title}>
          <div className={styles.title__header}>
            <div className={styles.title__main}>식단 파일 다운로드</div>
            <Cancel onClick={closeModal} />
          </div>
          <div className={styles.title__sub}>식단은 2022/11/29 부터 다운받을 수 있어요.</div>
        </div>

        <div className={styles['dates-container']}>
          <DateSelector title="시작일" date={startDate} setDate={setStartDate} />
          <DateSelector title="종료일" date={endDate} setDate={setEndDate} />
        </div>

        <div className={styles['toggle-container']}>
          <label htmlFor="toggle">학생식당만</label>
          <DownloadToggleButton
            isStudentCafeteriaOnly={isStudentCafeteriaOnly}
            onToggle={setIsStudentCafeteriaOnly}
          />
        </div>

        <div className={styles['button-container']}>
          <button
            type="button"
            className={styles['button-container__button--excel']}
            onClick={handleDownloadExcel}
            disabled={isDownloading}
          >
            <ExcelDownload />
            <div className={styles['button-container__button--text']}>{isDownloading ? <LoadingSpinner /> : '엑셀 다운로드'}</div>
          </button>

          <button
            type="button"
            className={styles['button-container__button--photo']}
            onClick={handleDownloadImage}
            disabled={isImageDownloading}
          >
            <PhotoDownload />
            <div className={styles['button-container__button--text']}>{isImageDownloading ? <LoadingSpinner /> : '사진 다운로드'}</div>
          </button>
        </div>

      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
