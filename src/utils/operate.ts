import { DiningType } from 'models/dinings';

import dayjs from 'dayjs';

export const getDiningTypeOnTime = (): DiningType => {
  const now = new Date();
  const time = now.getHours() * 60 + now.getMinutes();

  if (time <= 630) return 'BREAKFAST'; // 00:01~10:30
  if (time <= 900) return 'LUNCH'; // 10:31~15:00
  return 'DINNER'; // 15:01~24:00
};

// date = 'yyMMdd'
export const getIsOperating = (selectedDiningType: DiningType, date: string) => {
  const today = dayjs().format('YYMMDD');
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;

  if (date !== today) {
    return false;
  }

  // 08:00~10:00
  if (selectedDiningType === 'BREAKFAST' && (time >= 480 && time <= 600)) {
    return true;
  }
  // 11:00~14:00
  if (selectedDiningType === 'LUNCH' && (time >= 660 && time <= 840)) {
    return true;
  }
  // 17:00~19:00
  if (selectedDiningType === 'DINNER' && (time >= 1020 && time <= 1140)) {
    return true;
  }
  return false;
};
