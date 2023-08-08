import { NextRequest } from 'next/server';

const getSearchParamsStartAfter = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const startAfter = Number(searchParams.get('startAfter')) || '';
  return startAfter;
};

export default getSearchParamsStartAfter;
