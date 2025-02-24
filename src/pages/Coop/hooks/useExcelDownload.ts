import { getExcel } from 'api/dinings';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import showToast from 'utils/showToast';

import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useMutation } from '@tanstack/react-query';

const useExcelDownload = () => {
  const {
    setDownloadErrorStatus,
    setDownloadErrorMessage,
  } = useErrorMessageStore();

  const { mutate: downloadExcel, isPending: isDownloading } = useMutation({
    mutationFn: async ({ startDate, endDate, isCafeteria }: {
      startDate: string, endDate: string, isCafeteria: boolean
    }) => {
      const response = await getExcel({ startDate, endDate, isCafeteria });

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
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setDownloadErrorStatus(err.status);
        setDownloadErrorMessage(err.message);
        showToast('error', err.message);
      } else {
        setDownloadErrorStatus(400);
        setDownloadErrorMessage(err.message);
        showToast('error', '시작일과 종료일을 확인해주세요.');
        sendClientError(err);
      }
    },
  });

  return { isDownloading, downloadExcel };
};

export default useExcelDownload;
