import { Author } from 'types/author';
import fetcher from 'utils/fetcher';

const getAuthorLoggedInfos = async (email: string | null | undefined) => {
  const authorLoggedInfos = await fetcher<Author>(`/author/email/${email}`);
  return authorLoggedInfos;
};

export default getAuthorLoggedInfos;
