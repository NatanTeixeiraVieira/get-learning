'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Camera } from 'lucide-react';
import useAccountInfosStore from 'store/accountInfos';
import { Author } from 'types/author';
import { image } from 'utils/validations';
import { z } from 'zod';

import { Avatar, AvatarImage, Container, EditAvatar, Infos } from './styles';

import AccountConfigInfo from 'components/AccountConfigInfo';
import AvatarProfile from 'components/AvatarProfile';
import { Button } from 'components/Button';
import { DialogBox } from 'components/DialogBox';
import EditAccountInfo from 'components/EditAccountInfo';

type AccountInfosProps = {
  authorLoggedInfos: Author;
};

const avatarSchema = z.object({
  avatarImage: image,
});

type AvatarDatas = z.infer<typeof avatarSchema>;

export default function AccountInfos({ authorLoggedInfos }: AccountInfosProps) {
  const {
    actions: { handleOpenDialogBox },
  } = useAccountInfosStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<AvatarDatas>({});

  const [editAvatarImageIsOpen, setEditAvatarImageIsOpen] = useState(false);
  const [previewAvatarImage, setPreviewAvatarImage] = useState('');

  const watchAvatarImage = watch('avatarImage');

  useEffect(() => {
    const handleEditAvatarImage = () => {
      if (errors.avatarImage) {
        return;
      }

      const previewUrl = URL.createObjectURL(watchAvatarImage[0]);

      setPreviewAvatarImage(previewUrl);
      setEditAvatarImageIsOpen(true);
    };

    if (dirtyFields.avatarImage) {
      handleEditAvatarImage();
    }
  }, [watchAvatarImage, errors.avatarImage, dirtyFields.avatarImage]);

  const handleCloseDialogBox = () => {
    setEditAvatarImageIsOpen(false);
  };

  const onSubmit: SubmitHandler<AvatarDatas> = (datas) => {
    console.log(datas);
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
