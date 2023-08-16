import { MakePostData } from 'types/addPostDatas';
import fetcher from 'utils/fetcher';

import { uploadImage } from './uploadImage';

type PostReceived = {
  tags: string[];
  content: string;
  authorId: string;
} & MakePostData;

export const addPost = async (postReceived: PostReceived) => {
  const responseUploadImage = await uploadImage(postReceived.coverImage);

  if (responseUploadImage instanceof Error) {
    return {
      datas: {
        message:
          'Falha ao enviar o post. Por favor, tente novamente mais tarde',
      },
      status: 500,
      ok: false,
    };
  }

  const postSendBackend = {
    title: postReceived.title,
    excerpt: postReceived.excerpt,
    category: postReceived.category,
    allowComents: postReceived.allowComents,
    content: postReceived.content,
    tags: postReceived.tags,
    authorId: postReceived.authorId,
    coverImage: responseUploadImage,
  };

  const response = await fetcher<{ message: string }>('/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postSendBackend),
  });
  return response;
};
