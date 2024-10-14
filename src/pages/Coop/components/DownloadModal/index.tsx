import { useState, useEffect, useCallback } from 'react';

import { getExcel } from 'api/dinings';
import DownloadIcon from 'assets/svg/common/download-white.svg?react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DownloadToggleButton from '../DownloadToggleButton';
import ErrorTooltip from '../ErrorTooltip';

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
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const hideTooltip = () => {
    setErrorCode(null);
  };

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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
    const today = new Date();

    if (new Date(formattedStartDate) > today || new Date(formattedEndDate) > today) {
      setErrorCode(1);
      return;
    }

    if (new Date(formattedStartDate) < new Date('2022-11-29')) {
      setErrorCode(2);
      return;
    }

    if (new Date(formattedStartDate) > new Date(formattedEndDate)) {
      setErrorCode(3);
      return;
    }

    const requestBody = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      isCafeteria: isStudentCafeteriaOnly,
    };

    try {
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
    } catch (error: any) {
      showToast('파일 다운로드에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div className={styles.container} role="dialog" aria-modal="true">
        <div className={styles['title--main']}>식단 파일 다운로드</div>
        <div className={styles['title--sub']}>식단은 2022/11/29 부터 다운받을 수 있어요.</div>
        <div className={styles['date-container']}>
          <div className={styles['date-start-container']}>
            <div className={styles['start--title']}>시작일</div>
            <div className={styles['date-input']}>
              <input
                type="number"
                value={startDate.year}
                onChange={(e) => handleDateChange(setStartDate, 'year', e)}
                className={styles['date-input-box']}
                placeholder="YYYY"
              />
              <span className={styles['input-box-slash']}>/</span>
              <input
                type="number"
                value={startDate.month}
                onChange={(e) => handleDateChange(setStartDate, 'month', e)}
                className={styles['date-input-box']}
                placeholder="MM"
              />
              <span className={styles['input-box-slash']}>/</span>
              <input
                type="number"
                value={startDate.day}
                onChange={(e) => handleDateChange(setStartDate, 'day', e)}
                className={styles['date-input-box']}
                placeholder="DD"
              />
            </div>
          </div>

          <div className={styles['date-end-container']}>
            <div className={styles['end--title']}>종료일</div>
            <div className={styles['date-input']}>
              <input
                type="number"
                value={endDate.year}
                onChange={(e) => handleDateChange(setEndDate, 'year', e)}
                className={styles['date-input-box']}
                placeholder="YYYY"
              />
              <span className={styles['input-box-slash']}>/</span>
              <input
                type="number"
                value={endDate.month}
                onChange={(e) => handleDateChange(setEndDate, 'month', e)}
                className={styles['date-input-box']}
                placeholder="MM"
              />
              <span className={styles['input-box-slash']}>/</span>
              <input
                type="number"
                value={endDate.day}
                onChange={(e) => handleDateChange(setEndDate, 'day', e)}
                className={styles['date-input-box']}
                placeholder="DD"
              />
            </div>
          </div>
        </div>

        <div className={styles['toggle-container']}>
          <label htmlFor="toggle">학생식당만 다운로드</label>
          <div className={styles['toggle-Wrapper']}>
            <DownloadToggleButton
              isStudentCafeteriaOnly={isStudentCafeteriaOnly}
              onToggle={setIsStudentCafeteriaOnly}
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles['button-container']}
          onClick={submitDates}
        >
          <div className={styles['button-wrapper']}>
            <div className={styles['button-title']}>다운로드</div>
            <DownloadIcon className={styles['download-button']} />
          </div>
          {errorCode && <ErrorTooltip errorCode={errorCode} onHide={hideTooltip} />}
        </button>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
