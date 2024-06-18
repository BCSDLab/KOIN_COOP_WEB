import { patchDiningImage } from 'api/coop';
import { postUploadUrl } from 'api/uploadUrl';
import { DiningImageParams } from 'models/coop';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadUrl = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (file: File) => postUploadUrl({
      content_length: file.size,
      content_type: file.type,
      file_name: file.name,
    }),
  });

  const getUploadUrl = async (file: File) => {
    try {
      const result = await mutateAsync(file);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

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
