import { Suspense, useState } from 'react';

import Calendar from 'pages/Coop/components/Calendar';
import DiningBlocks from 'pages/Coop/components/DiningBlocks';
import DiningTypeSelect from 'pages/Coop/components/DiningTypeSelect';
import { getDiningTypeOnTime } from 'utils/operate';

import dayjs from 'dayjs';

import styles from './Coop.module.scss';

export default function Coop() {
  const [date, setDate] = useState(dayjs().format('YYMMDD'));
  const [diningType, setDiningType] = useState(getDiningTypeOnTime());

  return (
    <div className={styles['container-wrapper']}>
      <div className={styles.container}>
        <Calendar selectedDate={date} setSelectedDate={setDate} />
        <DiningTypeSelect selectedDiningType={diningType} setSelectedDiningType={setDiningType} />
        <Suspense>
          <DiningBlocks diningType={diningType} date={date} />
        </Suspense>
      </div>
    </div>
  );
}
