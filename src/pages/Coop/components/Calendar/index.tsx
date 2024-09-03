import cn from 'utils/className';

import styles from './Calendar.module.scss';
import useCalendar from './hooks/useCalendar';

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const { dateList, isToday } = useCalendar();

  return (
    <div>
      <div>월간 식단</div>
      <div>
        {`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${DAYS[selectedDate.getDay()]}요일`}
      </div>
      <div>
        <button type="button" onClick={() => {}}>주간</button>
        <button type="button" onClick={() => {}}>월간</button>
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
                [styles['date--selected']]: selectedDate.getTime() === date.getTime(),
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
