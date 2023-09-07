import { AccountInfosDatas } from 'types/accountInfosDatas';
import { Author } from 'types/author';
import fetcher from 'utils/fetcher';

import { AvatarDatas } from 'components/AccountInfos';

import { deleteImage } from './deleteImage';
import { uploadImage } from './uploadImage';

export const updateAvatar = async (
  authorId: Author['authorId'],
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

export const updateInfo = async (
  authorId: Author['authorId'],
  datas: AccountInfosDatas
) => {
  try {
    const responseUploadInfos = await fetcher<{ message: string }>(
      `/author/${authorId}/infos`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
      }
    );
    return responseUploadInfos;
  } catch (error) {
    return {
      datas: {
        message:
          'Falha ao atualizar informação. Por favor, tente novamente mais tarde',
      },
      status: 500,
      ok: false,
    };
  }
};
