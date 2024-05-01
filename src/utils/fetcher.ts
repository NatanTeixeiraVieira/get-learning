import { contentTypeJson } from 'constants/request';
import { Fetcher } from 'types/fetcher';

const fetcher = async <T = unknown>(
  input: RequestInfo | URL,
  body?: Record<string, unknown> | FormData | null,
  init?: Omit<RequestInit, 'body'>
) => {
  const initRequestOptions: RequestInit = {
    ...init,
    headers: {
      Accept: contentTypeJson,
      ...init?.headers,
    },
  };

  const requesBody = body instanceof FormData ? body : JSON.stringify(body);

  const requestOptions = body
    ? { ...initRequestOptions, body: requesBody }
    : initRequestOptions;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${input}`,
    requestOptions
  );

  const data: T = await res.json();

  const response: Fetcher<T> = {
    data,
    success: res.ok,
    statusCode: res.status,
    status: res.statusText,
    errorMessage: (data as { errorMessage: string }).errorMessage,
  };

  return response;
};

export default fetcher;
