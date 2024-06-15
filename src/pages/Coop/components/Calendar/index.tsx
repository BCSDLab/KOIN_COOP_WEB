import cn from 'utils/className';
import { getDayOfWeek } from 'utils/date';

import dayjs from 'dayjs';

import styles from './Calendar.module.scss';

interface Props {
  selectedDate: string; // .format('YYYY-MM-DD') 형식
  setSelectedDate: (dateType: string) => void;
}
export default function Calendar({ selectedDate, setSelectedDate }: Props) {
  const today = dayjs();
  const weekDays = Array.from(
    { length: 7 },
    (_, i) => today.add(i - 3, 'day').format('YYYY-MM-DD'),
  );

  return (
    <div className={styles.container}>
      {weekDays.map((day) => (
        <button
          key={day}
          type="button"
          className={styles.day}
          onClick={() => setSelectedDate(day)}
        >
          <span className={cn({
            [styles['day-of-week']]: true,
            [styles['day-of-week--after']]: dayjs(day).isAfter(today, 'day'),
            [styles['day-of-week--selected']]: day === selectedDate,
          })}
          >
            {getDayOfWeek(day)}
          </span>
          <span className={cn({
            [styles.date]: true,
            [styles['date--previous']]: dayjs(day).isBefore(today, 'day'),
            [styles['date--today']]: day === today.format('YYYY-MM-DD'),
            [styles['date--selected']]: day === selectedDate,
          })}
          >
            {dayjs(day).format('DD')}
          </span>
        </button>
      ))}
    </div>
  );
}
