import { Author } from 'types/author';
import { authorEndpointId } from 'utils/endpoints';
import fetcher from 'utils/fetcher';

export const findAuthorById = async (authorId: string) => {
  const author = await fetcher<Author>(authorEndpointId(authorId), null);

  return author;
};
