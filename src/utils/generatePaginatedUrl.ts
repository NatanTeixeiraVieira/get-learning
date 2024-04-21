const generatePaginatedUrl = (
  baseUrl: string,
  page?: number,
  limit?: number,
  direction?: 'asc' | 'desc'
) => {
  const params = new URLSearchParams();

  if (page) {
    params.append('page', page.toString());
  }

  if (limit) {
    params.append('limit', limit.toString());
  }

  if (direction) {
    params.append('direction', direction.toString());
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  return url;
};

export default generatePaginatedUrl;
