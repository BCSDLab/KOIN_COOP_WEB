import { useCallback } from 'react';

import showToast from 'utils/showToast';

const DOWNLOAD_AVAILABLE_FROM = new Date(2022, 10, 29);

interface DateInput {
  year: number | '';
  month: number | '';
  day: number | '';
}

const useValidateDates = () => {
  const validateDates = useCallback((startDate: DateInput, endDate: DateInput) => {
    if (!startDate.year || !startDate.month
      || !startDate.day || !endDate.year || !endDate.month || !endDate.day) {
      showToast('error', '시작일과 종료일을 입력해주세요.');
      return false;
    }

    const formatDate = (date: DateInput) => `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;

    const startDateObj = new Date(formatDate(startDate));
    const endDateObj = new Date(formatDate(endDate));

    if (startDateObj < DOWNLOAD_AVAILABLE_FROM) {
      showToast('error', '2022/11/29 식단부터 다운받을 수 있어요.');
      return false;
    }

    if (startDateObj > endDateObj) {
      showToast('error', '시작일은 종료일 이전으로 설정해주세요.');
      return false;
    }

    return true;
  }, []);

  return { validateDates };
};

export default useValidateDates;
