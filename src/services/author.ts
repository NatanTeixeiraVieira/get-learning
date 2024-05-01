import { tokenKey } from 'constants/cookiesKeys';
import {
  updateAuthorImageEndpoint,
  updateAuthorInfoEndpoint,
} from 'constants/endpoints';
import { contentTypeMultiparFormData, methodUpdate } from 'constants/request';
import { parseCookies } from 'nookies';
import { Author } from 'types/author';
import { UpdateAuthor } from 'types/updateAuthor';
import { authorEndpointId } from 'utils/endpoints';
import fetcher from 'utils/fetcher';
import { getClientAuthentication } from 'utils/getClientAuthentication';

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

  const response = await fetcher<UpdateAuthor>(updateAuthorInfoEndpoint, body, {
    method: methodUpdate,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const updateAuthorImage = async (authorImage: FileList) => {
  const { token } = getClientAuthentication();
  const formData = new FormData();
  formData.append('authorImage', authorImage[0]);
  const response = await fetcher<UpdateAuthor>(
    updateAuthorImageEndpoint,
    formData,
    {
      method: methodUpdate,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
