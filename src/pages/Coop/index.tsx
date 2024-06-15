import { useState } from 'react';

import Calendar from 'pages/Coop/components/Calendar';
import MenuCard from 'pages/Coop/components/MenuCard';
import MenuType from 'pages/Coop/components/MenuType';
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
        <MenuType diningType={diningType} setDiningType={setDiningType} />
        <MenuCard diningType={diningType} date={selectedDate} />
      </div>
    </div>
  );
}
