import { Suspense, useState } from 'react';

import useMediaQuery from 'hooks/useMediaQuery';
import ErrorBoundary from 'layout/ErrorBoundary';
import Calendar from 'pages/Coop/components/Calendar';
import DiningBlocks from 'pages/Coop/components/DiningBlocks';
import DiningDownload from 'pages/Coop/components/DiningDownload';
import DiningTypeSelect from 'pages/Coop/components/DiningTypeSelect';
import { getDiningTypeOnTime } from 'utils/operate';

import MobileDiningTypeSelect from './components/DiningTypeSelect/MobileDiningTypeSelect';
import styles from './Coop.module.scss';

import type { DiningType } from 'models/dinings';

export default function Coop() {
  const [date, setDate] = useState(new Date());
  const [diningType, setDiningType] = useState<DiningType>(getDiningTypeOnTime());
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <Calendar selectedDate={date} setSelectedDate={setDate} />
      </div>
      <div className={styles.content}>
        {!isMobile && ( // 모바일이 아닌 경우에만 렌더링
          <div className={styles.diningDownloadWrapper}>
            <DiningDownload />
          </div>
        )}
        {isMobile ? (
          <MobileDiningTypeSelect
            selectedDiningType={diningType}
            setSelectedDiningType={setDiningType}
          />
        ) : (
          <div className={styles.diningTypeWrapper}>
            <DiningTypeSelect
              selectedDiningType={diningType}
              setSelectedDiningType={setDiningType}
            />
          </div>
        )}
        <ErrorBoundary message="데이터를 불러오는 과정 중 문제가 발생하였습니다.">
          <Suspense fallback={<div />}>
            <DiningBlocks diningType={diningType} date={date} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
