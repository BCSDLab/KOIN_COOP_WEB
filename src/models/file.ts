export interface CustomFileType {
  content_length: number;
  content_type: string;
  file_name: string;
}

export interface FileResponse {
  pre_signed_url: string;
  file_url: string;
  expiration_date: string;
}
