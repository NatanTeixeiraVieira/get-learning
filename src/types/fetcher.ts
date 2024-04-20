export type Fetcher<T = unknown> = {
  data: T;
  success: boolean;
  statusCode: number;
  status: string;
  errorMessage: string;
};
