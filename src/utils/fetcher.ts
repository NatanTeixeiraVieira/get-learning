const fetcher = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${input}`, init);
  const datas: T = await res.json();

  return { datas, status: res.status, ok: res.ok };
};

export default fetcher;
