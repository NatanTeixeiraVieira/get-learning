import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'lib/firebaseWebConfig';
import { MakePostData } from 'types/addPostDatas';
import { CoverImage } from 'types/post';
import fetcher from 'utils/fetcher';
import { acceptedImageTypes } from 'utils/validations';
import { v4 } from 'uuid';

type PostReceived = {
  tags: string[];
  content: string;
  authorId: string;
} & MakePostData;

const uploadImage = async (image: FileList) => {
  if (acceptedImageTypes.includes(image[0].type)) {
    const imageId = v4();
    const storageRef = ref(storage, `coverImage/${imageId}`);
    const uploadedImage = await uploadBytes(storageRef, image[0]);
    const imageUrl = await getDownloadURL(uploadedImage.ref);

    return { name: uploadedImage.ref.name, url: imageUrl } as CoverImage;
  }

  return new Error('Tipo de arquivo não permitido');
};

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
