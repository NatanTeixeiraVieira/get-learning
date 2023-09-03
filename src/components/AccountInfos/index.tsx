'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Camera } from 'lucide-react';
import { updateAvatar } from 'services/updateAuthor';
import useAccountInfosStore from 'store/accountInfos';
import { Author } from 'types/author';
import translateText from 'utils/translateText';

import { Avatar, AvatarImage, Container, EditAvatar, Infos } from './styles';

import AccountConfigInfo from 'components/AccountConfigInfo';
import AvatarProfile from 'components/AvatarProfile';
import { Button } from 'components/Button';
import { DialogBox } from 'components/DialogBox';
import EditAccountInfo from 'components/EditAccountInfo';

type AccountInfosProps = {
  authorLoggedInfos: Author;
};

export type AvatarDatas = {
  avatarImage: FileList;
};

export default function AccountInfos({ authorLoggedInfos }: AccountInfosProps) {
  const {
    actions: { handleOpenDialogBox },
  } = useAccountInfosStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<AvatarDatas>({
    defaultValues: {
      avatarImage: undefined,
    },
  });

  const [editAvatarImageIsOpen, setEditAvatarImageIsOpen] = useState(false);
  const [previewAvatarImage, setPreviewAvatarImage] = useState('');

  const router = useRouter();

  const watchAvatarImage = watch('avatarImage');

  useEffect(() => {
    const handleEditAvatarImage = () => {
      if (errors.avatarImage) {
        console.log(errors.avatarImage);
        return;
      }

      if (watchAvatarImage) {
        const previewUrl = URL.createObjectURL(watchAvatarImage[0]);

        setPreviewAvatarImage(previewUrl);
        setEditAvatarImageIsOpen(true);
      }
    };

    if (dirtyFields.avatarImage) {
      handleEditAvatarImage();
    }
  }, [watchAvatarImage, errors.avatarImage, dirtyFields.avatarImage]);

  const handleCloseDialogBox = () => {
    setPreviewAvatarImage('');
    reset();
    setEditAvatarImageIsOpen(false);
  };

  const onSubmit: SubmitHandler<AvatarDatas> = async (datas) => {
    const responseUpdateAvatar = await updateAvatar(
      authorLoggedInfos.authorId,
      authorLoggedInfos.avatar?.name,
      datas
    );

    const translatedResponse = (
      await translateText(responseUpdateAvatar.datas.message)
    ).toLowerCase();

    if (responseUpdateAvatar.ok) {
      setEditAvatarImageIsOpen(false);
      router.refresh();
      toast.success(translatedResponse + '.');
      return;
    }

    toast.error(translatedResponse + '.');
  };

  return (
    <>
      <EditAccountInfo authorLoggedInfos={authorLoggedInfos} />
      <EditAvatar onSubmit={handleSubmit(onSubmit)}>
        <DialogBox.Root open={editAvatarImageIsOpen} width="30rem">
          <DialogBox.Title text="Atualizar foto de perfil" />
          <AvatarImage>
            <AvatarProfile
              src={previewAvatarImage}
              alt="Avatar do proprietário do blog"
              width={350}
              height={350}
            />
          </AvatarImage>
          <DialogBox.Actions>
            <DialogBox.Button
              variant="destructive"
              onClick={handleCloseDialogBox}
            >
              Cancelar
            </DialogBox.Button>
            <DialogBox.Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
            >
              {isSubmitting && <Button.IconSpin />}
              {!isSubmitting && 'Salvar'}
            </DialogBox.Button>
          </DialogBox.Actions>
        </DialogBox.Root>
      </EditAvatar>
      <Container>
        <Avatar>
          <label htmlFor="avatarImagePicker">
            <AvatarProfile
              src={authorLoggedInfos.avatar?.url}
              alt="Avatar do proprietário do blog"
              width={130}
              height={130}
            />
            <Camera size="2.2rem" color="black" />
            <input
              type="file"
              id="avatarImagePicker"
              accept="image/*"
              {...register('avatarImage')}
            />
          </label>
        </Avatar>

        <Infos>
          <tbody>
            <AccountConfigInfo
              descriptor="Nome de usuário"
              info={authorLoggedInfos.name}
              onClickEdit={() => handleOpenDialogBox('name')}
            />
            <AccountConfigInfo
              descriptor="Email"
              info={authorLoggedInfos.userEmail}
              pencil={false}
            />
            <AccountConfigInfo
              descriptor="Descrição"
              info={authorLoggedInfos?.description}
              onClickEdit={() => handleOpenDialogBox('description')}
            />
          </tbody>
        </Infos>
      </Container>
    </>
  );
}
