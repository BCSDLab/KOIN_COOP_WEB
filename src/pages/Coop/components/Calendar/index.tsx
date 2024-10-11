import { useState } from 'react';

import cn from 'utils/className';

import DateMover from '../DateMover';

import styles from './Calendar.module.scss';
import useCalendar from './hooks/useCalendar';
import useMediaQuery from 'hooks/useMediaQuery';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const WEEK = 7;

const isSameDate = (date: Date, comparisonDate: Date) => (
  date.getFullYear() === comparisonDate.getFullYear()
  && date.getMonth() === comparisonDate.getMonth()
  && date.getDate() === comparisonDate.getDate()
);

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const { dateList, isToday } = useCalendar();
  const [dateListFormState, setdateListFormState] = useState<'week' | 'month'>('week');
  const { isMobile } = useMediaQuery();

  const handlePrevNext = (direction: 'prev' | 'next') => {
    let newDate;
    if (dateListFormState === 'week') {
      newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + (direction === 'prev' ? -WEEK : WEEK)); // 주 단위 이동
    } else {
      newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1)); // 월 단위 이동
    }
    setSelectedDate(newDate); // 선택된 날짜 업데이트
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  const getDateList = (form: 'week' | 'month') => {
    if (form === 'week') {
      const todayDateIndex = dateList.findIndex((date) => isSameDate(selectedDate, date));
      const rowIndex = Math.floor(todayDateIndex / WEEK);

      return dateList.slice(rowIndex * WEEK, rowIndex * WEEK + WEEK);
    }

    if (form === 'month') {
      return dateList;
    }

    return [];
  };

  return (
    <div>
      {isMobile ? (
        // 모바일 뷰
        <div className={styles.container}>

          <div className={styles['move-wrapper-mobile']}>

            <div className={styles['title-wrapper-mobile']}>
              <div className={styles['title--main-mobile']}>
                {dateListFormState === 'month' ? '월간 식단' : '주간 식단'}
              </div>
              <div className={styles['title--sub-mobile']}>
                {`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${DAYS[selectedDate.getDay()]}요일`}
              </div>
            </div>

            <div className={styles['button-container-mobile']}>
              <button
                type="button"
                onClick={() => setdateListFormState('week')}
                className={cn({
                  [styles['form-toggle-button-mobile']]: true,
                  [styles['form-toggle-button-mobile--selected']]: dateListFormState === 'week',
                })}
              >
                주간
              </button>
              <button
                type="button"
                onClick={() => setdateListFormState('month')}
                className={cn({
                  [styles['form-toggle-button-mobile']]: true,
                  [styles['form-toggle-button-mobile--selected']]: dateListFormState === 'month',
                })}
              >
                월간
              </button>
            </div>
          </div>

          <DateMover
            onPrevClick={() => handlePrevNext('prev')}
            onNextClick={() => handlePrevNext('next')}
            onTodayClick={() => handleTodayClick()}
          />
          

          <div className={styles['calendar-body']}>
            <div className={styles.days}>
              {DAYS.map((day) => (
                <div key={day} className={styles.day}>{day}</div>
              ))}
            </div>
            <div className={styles['date-list']}>
              {getDateList(dateListFormState).map((date) => (
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
      ) : (
        // 데스크탑 뷰
        <div className={styles.container}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title--main']}>
              {dateListFormState === 'month' ? '월간 식단' : '주간 식단'}
            </div>
            <div className={styles['title--sub']}>
              {`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${DAYS[selectedDate.getDay()]}요일`}
            </div>
            <div className={styles['move-wrapper']}>
              <DateMover
                onPrevClick={() => handlePrevNext('prev')}
                onNextClick={() => handlePrevNext('next')}
                onTodayClick={() => handleTodayClick()}
              />
              <div className={styles['button-container']}>
                <button
                  type="button"
                  onClick={() => setdateListFormState('week')}
                  className={cn({
                    [styles['form-toggle-button']]: true,
                    [styles['form-toggle-button--selected']]: dateListFormState === 'week',
                  })}
                >
                  주간
                </button>
                <button
                  type="button"
                  onClick={() => setdateListFormState('month')}
                  className={cn({
                    [styles['form-toggle-button']]: true,
                    [styles['form-toggle-button--selected']]: dateListFormState === 'month',
                  })}
                >
                  월간
                </button>
              </div>
            </div>

          </div>
          <div className={styles['calendar-body']}>
            <div className={styles.days}>
              {DAYS.map((day) => (
                <div key={day} className={styles.day}>{day}</div>
              ))}
            </div>
            <div className={styles['date-list']}>
              {getDateList(dateListFormState).map((date) => (
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

      )}
    </div>

  );
}
