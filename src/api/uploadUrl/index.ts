import { accessClient } from 'api';
import { FileData, UploadUrlResponse } from 'models/file';

export const postUploadUrl = async (fileData: FileData) => {
  const { data } = await accessClient.post<FileData>('/coop/upload/url', fileData);
  return UploadUrlResponse.parse(data);
};
