import { useState } from 'react';

import { Menus } from 'models/coop';
import { getCurrentMenuType } from 'pages/Coop/hook/useGetCurrentMenuType';

import dayjs from 'dayjs';

import Calendar from './components/Calendar';
import MenuCard from './components/MenuCard';
import MenuType from './components/MenuType';
import styles from './Coop.module.scss';

export default function Coop() {
  const [selectedMenuType, setSelectedMenuType] = useState<Menus>(getCurrentMenuType());
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
