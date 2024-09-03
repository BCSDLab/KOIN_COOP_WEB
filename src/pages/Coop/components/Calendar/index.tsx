import cn from 'utils/className';

import styles from './Calendar.module.scss';
import useCalendar from './hooks/useCalendar';

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const isSameDate = (date: Date, comparisonDate: Date) => (
  date.getFullYear() === comparisonDate.getFullYear()
  && date.getMonth() === comparisonDate.getMonth()
  && date.getDate() === comparisonDate.getDate()
);

export default function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const { dateList, isToday } = useCalendar();

  return (
    <div className={styles.container}>
      <div className={styles['title-wrapper']}>
        <div className={styles['title--main']}>월간 식단</div>
        <div className={styles['title--sub']}>
          {`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${DAYS[selectedDate.getDay()]}요일`}
        </div>
        <div className={styles['button-container']}>
          <button type="button" onClick={() => {}}>주간</button>
          <button type="button" onClick={() => {}}>월간</button>
        </div>
      </div>
      <div className={styles['calendar-body']}>
        <div className={styles.days}>
          {DAYS.map((day) => (
            <div key={day} className={styles.day}>{day}</div>
          ))}
        </div>
        <div className={styles['date-list']}>
          {dateList.map((date) => (
            <button
              type="button"
              key={date.toString()}
              className={cn({
                [styles.date]: true,
                [styles['date--today']]: isToday(date),
                [styles['date--selected']]: isSameDate(selectedDate, date),
              })}
              onClick={() => {
                setSelectedDate(date);
              }}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
