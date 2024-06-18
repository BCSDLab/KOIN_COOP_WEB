import { patchDiningImage } from 'api/coop';
import { postUploadUrl } from 'api/uploadUrl';
import { DiningImageParams } from 'models/coop';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadUrl = () => {
  const { mutateAsync: getUploadUrl } = useMutation({
    mutationFn: (file: File) => postUploadUrl({
      content_length: file.size,
      content_type: file.type,
      file_name: file.name,
    }),
  });

  return getUploadUrl;
};

export const useUploadDiningImage = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadDiningImage } = useMutation({
    mutationFn: (params: DiningImageParams) => patchDiningImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return uploadDiningImage;
};
