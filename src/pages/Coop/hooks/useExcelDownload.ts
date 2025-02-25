import { getExcel } from 'api/dinings';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import showToast from 'utils/showToast';

import { isKoinError } from '@bcsdlab/koin';
import { useMutation } from '@tanstack/react-query';

const useExcelDownload = () => {
  const { setDownloadErrorStatus, setDownloadErrorMessage } = useErrorMessageStore();

  const mutation = useMutation({
    mutationFn: async ({ startDate, endDate, isCafeteria }: {
      startDate: string; endDate: string; isCafeteria: boolean;
    }) => {
      const response = await getExcel({ startDate, endDate, isCafeteria });
      const filename = `${startDate} ~ ${endDate} menu`;

      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setDownloadErrorStatus(err.status);
        setDownloadErrorMessage(err.message);
        showToast('error', err.message);
      } else {
        setDownloadErrorStatus(400);
        setDownloadErrorMessage('다운로드 중 알 수 없는 에러가 발생했습니다.');
        showToast('error', '다운로드 중 에러가 발생했습니다.');
      }
    },
  });

  return {
    isDownloading: mutation.isPending,
    downloadExcel: mutation.mutate,
    downloadExcelAsync: mutation.mutateAsync,
  };
};

export default useExcelDownload;
