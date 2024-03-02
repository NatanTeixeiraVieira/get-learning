const fetcher = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${input}`, init);

  const data: T = await res.json();

  return {
    data,
    success: res.ok,
    statusCode: res.status,
    status: res.statusText,
  };
};

export default fetcher;
