import { getImage } from 'api/dinings';
import { useErrorMessageStore } from 'store/useErrorMessageStore';
import showToast from 'utils/showToast';

import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useMutation } from '@tanstack/react-query';

const useImageDownload = () => {
  const { setDownloadErrorStatus, setDownloadErrorMessage } = useErrorMessageStore();

  const mutation = useMutation({
    mutationFn: async ({ startDate, endDate, isCafeteria }: {
      startDate: string, endDate: string, isCafeteria: boolean
    }) => {
      const response = await getImage({ startDate, endDate, isCafeteria });

      const filename = `${startDate} ~ ${endDate} menu`;

      const blob = new Blob([response.data], { type: 'application/zip' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.zip`;
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
        setDownloadErrorMessage(err.message);
        showToast('error', '이미지 다운로드에 실패했습니다.');
        sendClientError(err);
      }
    },
  });

  return {
    isDownloading: mutation.isPending,
    downloadImage: mutation.mutate,
    downloadImageAsync: mutation.mutateAsync,
  };
};

export default useImageDownload;
