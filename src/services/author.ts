import { tokenKey } from 'constants/cookiesKeys';
import { authorEndpoint } from 'constants/endpoints';
import { methodUpdate } from 'constants/request';
import { parseCookies } from 'nookies';
import { Author } from 'types/author';
import { UpdateAuthorInfo } from 'types/updateAuthorInfo';
import { authorEndpointId } from 'utils/endpoints';
import fetcher from 'utils/fetcher';

export const findAuthorById = async (authorId: string) => {
  const author = await fetcher<Author>(authorEndpointId(authorId), null);

  return author;
};

export const updateAuthorInfo = async (name: string, description: string) => {
  const body = {
    name,
    description,
  };
  const token = parseCookies()[tokenKey];

  const response = await fetcher<UpdateAuthorInfo>(authorEndpoint, body, {
    method: methodUpdate,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};
