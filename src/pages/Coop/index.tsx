import { Suspense, useState } from 'react';

import ErrorBoundary from 'layout/ErrorBoundary';
import Calendar from 'pages/Coop/components/Calendar';
import DiningBlocks from 'pages/Coop/components/DiningBlocks';
import DiningTypeSelect from 'pages/Coop/components/DiningTypeSelect';
import { getDiningTypeOnTime } from 'utils/operate';

import styles from './Coop.module.scss';

import type { DiningType } from 'models/dinings';

export default function Coop() {
  const [date, setDate] = useState(new Date());
  const [diningType, setDiningType] = useState<DiningType>(getDiningTypeOnTime());

  return (
    <div className={styles.container}>
      <Calendar selectedDate={date} setSelectedDate={setDate} />
      <div className={styles.content}>
        <DiningTypeSelect selectedDiningType={diningType} setSelectedDiningType={setDiningType} />
        <ErrorBoundary message="데이터를 불러오는 과정 중 문제가 발생하였습니다.">
          <Suspense fallback={<div />}>
            <DiningBlocks diningType={diningType} date={date} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
