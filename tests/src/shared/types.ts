export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface UploadErrorDetailType {
  errors: string[];
  row: number;
  object_name: Record<string, unknown>;
}

export interface UploadErrorType {
  statusCode: number;
  title: string;
  detail: UploadErrorDetailType[];
  code: string;
}

export interface UploadResponseType {
  total_rows?: number;
  handled_rows?: number;
  skipped_rows_errors?: unknown[];
  errors: UploadErrorType[];
}
