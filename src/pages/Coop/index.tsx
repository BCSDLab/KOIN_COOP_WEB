import { useState } from 'react';

import Calendar from 'pages/Coop/components/Calendar';
import DiningBlocks from 'pages/Coop/components/DiningBlocks';
import DiningTypeSelect from 'pages/Coop/components/DiningTypeSelect';
import { getDiningTypeOnTime } from 'pages/Coop/hook/useGetCurrentMenuType';

import dayjs from 'dayjs';

import styles from './Coop.module.scss';

export default function Coop() {
  const [diningType, setDiningType] = useState(getDiningTypeOnTime());
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <div className={styles['container-wrapper']}>
      <div className={styles.container}>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <DiningTypeSelect diningType={diningType} setDiningType={setDiningType} />
        <DiningBlocks diningType={diningType} date={selectedDate} />
      </div>
    </div>
  );
}
