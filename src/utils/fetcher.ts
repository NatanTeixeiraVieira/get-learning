import { contentTypeJson } from 'constants/request';

const fetcher = async <T = unknown>(
  input: RequestInfo | URL,
  body?: Record<string, unknown> | null,
  init?: Omit<RequestInit, 'body'>
) => {
  const initRequestOptions: RequestInit = {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': contentTypeJson,
      Accept: contentTypeJson,
    },
  };

  const requestOptions = body
    ? { ...initRequestOptions, body: JSON.stringify(body) }
    : initRequestOptions;

  // console.log(requestOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${input}`,
    requestOptions
  );

  const data: T = await res.json();

  console.log(data);

  return {
    data,
    success: res.ok,
    statusCode: res.status,
    status: res.statusText,
    errorMessage: (data as { errorMessage: string }).errorMessage,
  };
};

export default fetcher;
