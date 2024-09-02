import cn from 'utils/className';

import styles from './Calendar.module.scss';
import useCalendar from './hooks/useCalendar';

interface CalendarProps {
  selectedDate: string; // .format('YYMMDD') 형식
  setSelectedDate: (dateType: string) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDateToYYMMDD(date: Date) {
  const year = date.getFullYear().toString().slice(-2); // 년도의 마지막 두 자리 (YY)
  const month = (`0${date.getMonth() + 1}`).slice(-2); // 월 (MM), 0으로 채움
  const day = (`0${date.getDate()}`).slice(-2); // 일 (DD), 0으로 채움

  return year + month + day;
}

export default function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const {
    dateList, month, today, isCurrentMonth, isToday,
  } = useCalendar();

  return (
    <div>
      <div>월간 식단</div>
      {/* <div>
        {`${selectedDate}월 ${today.getDate()}일 ${DAYS[today.getDay()]}요일`}
      </div> */}
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
                [styles['date--current-month']]: isCurrentMonth(date),
                [styles['date--today']]: isToday(date),
                [styles['date--selected']]: selectedDate === formatDateToYYMMDD(date),
              })}
              onClick={() => {
                setSelectedDate(formatDateToYYMMDD(date));
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
