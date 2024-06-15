import { Day } from 'models/date';

import dayjs from 'dayjs';

export const getDayOfWeek = (date: string): Day => { // date는 현재 .format('YYYY-MM-DD') 형식임. 아니어도 됨.
  const dayOfWeek = dayjs(date).day();
  const dayOfWeekKorean: Day[] = ['일', '월', '화', '수', '목', '금', '토'];
  return dayOfWeekKorean[dayOfWeek];
};
