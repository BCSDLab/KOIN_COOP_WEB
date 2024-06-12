import { useState } from 'react';

import Calendar from 'pages/Coop/components/Calendar';
import MenuCard from 'pages/Coop/components/MenuCard';
import MenuType from 'pages/Coop/components/MenuType';
import { getCurrentMenuType } from 'pages/Coop/hook/useGetCurrentMenuType';

import dayjs from 'dayjs';

import styles from './Coop.module.scss';

export default function Coop() {
  const [selectedMenuType, setSelectedMenuType] = useState(getCurrentMenuType());
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  return (
    <div className={styles['container-wrapper']}>
      <div className={styles.container}>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <MenuType selectedMenuType={selectedMenuType} setSelectedMenuType={setSelectedMenuType} />
        <MenuCard selectedMenuType={selectedMenuType} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
