import cn from 'utils/className';
import { getDayOfWeek } from 'utils/date';

import dayjs from 'dayjs';

import styles from './Calendar.module.scss';

interface CalendarProps {
  selectedDate: string; // .format('YYMMDD') 형식
  setSelectedDate: (dateType: string) => void;
}
export default function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const today = dayjs();
  const weekDays = Array.from(
    { length: 7 },
    (_, i) => today.add(i - 3, 'day').format('YYMMDD'),
  );

  return (
    <div className={styles.container}>
      {weekDays.map((date) => (
        <button
          key={date}
          type="button"
          className={styles.day}
          onClick={() => setSelectedDate(date)}
        >
          <span className={cn({
            [styles['day-of-week']]: true,
            [styles['day-of-week--after']]: dayjs(`20${date}`).isAfter(today, 'day'),
            [styles['day-of-week--selected']]: date === selectedDate,
          })}
          >
            {getDayOfWeek(date)}
          </span>
          <span className={cn({
            [styles.date]: true,
            [styles['date--previous']]: dayjs(`20${date}`).isBefore(today, 'day'),
            [styles['date--today']]: date === today.format('YYMMDD'),
            [styles['date--selected']]: date === selectedDate,
          })}
          >
            {date.slice(4)}
          </span>
        </button>
      ))}
    </div>
  );
}
