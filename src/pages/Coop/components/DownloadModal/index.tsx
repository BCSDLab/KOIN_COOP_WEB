import { useState, useCallback } from 'react';

import { getExcel } from 'api/dinings';
import Cancle from 'assets/svg/common/close.svg?react';
import ExcelDownload from 'assets/svg/common/excel-download.svg?react';
import LoadingSpinner from 'assets/svg/common/loading.svg?react';
import PhotoDownload from 'assets/svg/common/photo-download.svg?react';
import useBooleanState from 'hooks/useBooleanState';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [isDownloading, setIsDownloading] = useBooleanState(false);

  const handleDateChange = (
    setDate: React.Dispatch<React.SetStateAction<DateInput>>,
    field: keyof DateInput,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDate((prev) => ({
      ...prev,
      [field]: e.target.valueAsNumber || '',
    }));
  };

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

  const showToast = (message: string) => {
    toast(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const submitDates = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const requestBody = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      isCafeteria: isStudentCafeteriaOnly,
    };

    try {
      setIsDownloading(true);
      const response = await getExcel(requestBody);

      let filename = `dining_${requestBody.startDate}~${requestBody.endDate}.xlsx`;

      if (response && response.headers) {
        const contentDisposition = response.headers['content-disposition'];

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+)"?/);
          if (match) {
            const [, extractedFileName] = match;
            filename = decodeURIComponent(extractedFileName);
          }
        }
      }

      const downloadUrl = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      setIsDownloading(false);
    } catch (error) {
      // backend 수정 시 반영
      // if (error?.response?.data instanceof Blob) {
      //   const errorText = await error.response.data.text();
      //   const errorJson = JSON.parse(errorText);
      //   showToast(errorJson.message);
      // }

      showToast('다운로드에 실패했습니다.');
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div className={styles.container} role="dialog" aria-modal="true">
        <div className={styles.title}>
          <div className={styles.title__header}>
            <div className={styles.title__main}>식단 파일 다운로드</div>
            <Cancle onClick={closeModal} />
          </div>
          <div className={styles.title__sub}>식단은 2022/11/29 부터 다운받을 수 있어요.</div>
        </div>

        <div className={styles['dates-container']}>
          <div className={styles['date-container']}>
            <div className={styles['date-container__title']}>시작일</div>
            <div className={styles['date-container__input']}>
              <input
                type="number"
                value={startDate.year}
                onChange={(e) => handleDateChange(setStartDate, 'year', e)}
                className={styles['date-container__input--year']}
                placeholder="YYYY"
              />
              <span className={styles['date-container__slash']}>/</span>
              <input
                type="number"
                value={startDate.month}
                onChange={(e) => handleDateChange(setStartDate, 'month', e)}
                className={styles['date-container__input--month']}
                placeholder="MM"
              />
              <span className={styles['date-container__slash']}>/</span>
              <input
                type="number"
                value={startDate.day}
                onChange={(e) => handleDateChange(setStartDate, 'day', e)}
                className={styles['date-container__input--day']}
                placeholder="DD"
              />
            </div>
          </div>

          <div className={styles['date-container']}>
            <div className={styles['date-container__title']}>종료일</div>
            <div className={styles['date-container__input']}>
              <input
                type="number"
                value={endDate.year}
                onChange={(e) => handleDateChange(setEndDate, 'year', e)}
                className={styles['date-container__input--year']}
                placeholder="YYYY"
              />
              <span className={styles['date-container__slash']}>/</span>
              <input
                type="number"
                value={endDate.month}
                onChange={(e) => handleDateChange(setEndDate, 'month', e)}
                className={styles['date-container__input--month']}
                placeholder="MM"
              />
              <span className={styles['date-container__slash']}>/</span>
              <input
                type="number"
                value={endDate.day}
                onChange={(e) => handleDateChange(setEndDate, 'day', e)}
                className={styles['date-container__input--day']}
                placeholder="DD"
              />
            </div>
          </div>
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
            type="submit"
            className={styles['button-container__button--excel']}
            onClick={submitDates}
            disabled={isDownloading}
          >
            <ExcelDownload />
            <div className={styles['button-container__button--text']}>{isDownloading ? <LoadingSpinner /> : '사진 다운로드'}</div>
          </button>

          <button
            type="submit"
            className={styles['button-container__button--photo']}
            onClick={submitDates}
            disabled={isDownloading}
          >
            <PhotoDownload />
            <div className={styles['button-container__button--text']}>{isDownloading ? <LoadingSpinner /> : '사진 다운로드'}</div>
          </button>
        </div>

      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
