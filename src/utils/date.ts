import { Day } from 'models/date';

import dayjs from 'dayjs';

export const getDayOfWeek = (date: string): Day => { // date는 현재 .format('YYMMDD') 형식임
  const dayOfWeek = dayjs(`20${date}`).day(); // YYYYMMDD
  const dayOfWeekKorean: Day[] = ['일', '월', '화', '수', '목', '금', '토'];
  return dayOfWeekKorean[dayOfWeek];
};
