import { MakePostData } from 'types/addPostDatas';
import fetcher from 'utils/fetcher';

import { deleteImage } from './deleteImage';
import { uploadImage } from './uploadImage';

type PostReceived = {
  tags: string[];
  content: string;
  authorId: string;
} & MakePostData;

export const updatePost = async (
  postId: string,
  coverImageName: string,
  postReceived: PostReceived
) => {
  try {
    await deleteImage(coverImageName);
    const responseUploadImage = await uploadImage(postReceived.coverImage);

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

    const response = await fetcher<{ message: string }>(`/post/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postSendBackend),
    });
    return response;
  } catch (error) {
    return {
      datas: {
        message:
          'Falha ao enviar o post. Por favor, tente novamente mais tarde',
      },
      status: 500,
      ok: false,
    };
  }
};
