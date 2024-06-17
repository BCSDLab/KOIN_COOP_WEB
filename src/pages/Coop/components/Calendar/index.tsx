import cn from 'utils/className';
import { getDayOfWeek } from 'utils/date';

import dayjs from 'dayjs';

import styles from './Calendar.module.scss';

interface Props {
  selectedDate: string; // .format('YYMMDD') 형식
  setSelectedDate: (dateType: string) => void;
}
export default function Calendar({ selectedDate, setSelectedDate }: Props) {
  const today = dayjs();
  const weekDays = Array.from(
    { length: 7 },
    (_, i) => today.add(i - 3, 'day').format('YYMMDD'),
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
            [styles['date--today']]: day === today.format('YYMMDD'),
            [styles['date--selected']]: day === selectedDate,
          })}
          >
            {day.slice(4)}
          </span>
        </button>
      ))}
    </div>
  );
}
