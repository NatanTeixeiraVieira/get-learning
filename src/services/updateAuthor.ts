import fetcher from 'utils/fetcher';

import { AvatarDatas } from 'components/AccountInfos';

import { deleteImage } from './deleteImage';
import { uploadImage } from './uploadImage';

export const updateAvatar = async (
  authorId: string,
  avatarName: string | undefined,
  avatarReceived: AvatarDatas
) => {
  try {
    if (avatarName) {
      await deleteImage(`avatars/${avatarName}`);
    }
    const responseUploadAvatar = await uploadImage(
      avatarReceived.avatarImage,
      'avatars'
    );

    const response = await fetcher<{ message: string }>(
      `/author/${authorId}/avatar`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseUploadAvatar),
      }
    );
    return response;
  } catch (error) {
    return {
      datas: {
        message:
          'Falha ao atualizar o avatar. Por favor, tente novamente mais tarde',
      },
      status: 500,
      ok: false,
    };
  }
};
