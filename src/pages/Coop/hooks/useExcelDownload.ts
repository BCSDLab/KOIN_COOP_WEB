import { useState } from 'react';

import { getExcel } from 'api/dinings';
import showToast from 'utils/showToast';

const DOWNLOAD_AVAILABLE_FROM = new Date(2022, 10, 29); // month는 0부터 시작함

const useExcelDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcel = async (
    { startDate, endDate, isCafeteria }: {
      startDate: string, endDate: string, isCafeteria: boolean
    },
  ) => {
    if (!startDate || !endDate) {
      showToast('error', '시작일과 종료일을 입력해주세요.');
      return;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj < DOWNLOAD_AVAILABLE_FROM) {
      showToast('error', '2022/11/29 식단부터 다운받을 수 있어요.');
      return;
    }

    if (startDateObj > endDateObj) {
      showToast('error', '시작일은 종료일 이전으로 설정해주세요.');
      return;
    }

    const requestBody = { startDate, endDate, isCafeteria };

    try {
      setIsDownloading(true);
      const response = await getExcel(requestBody);

      let filename = `dining_${startDate}~${endDate}.xlsx`;

      if (response?.headers) {
        const contentDisposition = response.headers['content-disposition'];
        const match = contentDisposition?.match(/filename="?(.+)"?/);
        if (match) {
          filename = decodeURIComponent(match[1]);
        }
      }

      const downloadUrl = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      showToast('error', '엑셀 다운로드에 실패했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, downloadExcel };
};

export default useExcelDownload;
