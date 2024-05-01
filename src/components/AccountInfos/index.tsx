'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Camera } from 'lucide-react';
import { updateAuthorImage } from 'services/author';
import { UserLogin } from 'types/login';

import { Avatar, AvatarImage, Container, EditAvatar, Infos } from './styles';

import AccountConfigInfo from 'components/AccountConfigInfo';
import AvatarProfile from 'components/AvatarProfile';
import { Button } from 'components/Button';
import { DialogBox } from 'components/DialogBox';
import EditAccountInfo from 'components/EditAccountInfo';

type AccountInfosProps = {
  user: UserLogin;
};

export type AvatarData = {
  avatarImage: FileList;
};

export default function AccountInfos({ user }: AccountInfosProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<AvatarData>({
    defaultValues: {
      avatarImage: undefined,
    },
  });

  const [editAvatarImageIsOpen, setEditAvatarImageIsOpen] = useState(false);
  const [previewAvatarImage, setPreviewAvatarImage] = useState('');
  const [dialogBoxFieldName, setDialogBoxFieldName] = useState<
    'name' | 'description' | ''
  >('');

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

  const handleOpenTextDialogBox = (fieldName: 'name' | 'description') => {
    setDialogBoxFieldName(fieldName);
  };

  const handleCloseTextDialogBox = () => {
    setDialogBoxFieldName('');
  };

  const onSubmitImage: SubmitHandler<AvatarData> = async (data) => {
    const responseUpdateAvatar = await updateAuthorImage(data.avatarImage);
    if (responseUpdateAvatar.success) {
      setEditAvatarImageIsOpen(false);
      toast.success('Avatar atualizado com sucesso.');
      return;
    }
    toast.error('Houve um erro ao atualizar seu avatar');
  };

  return (
    <>
      {dialogBoxFieldName && (
        <EditAccountInfo
          user={user}
          fieldName={dialogBoxFieldName}
          onCancelButtonClicked={handleCloseTextDialogBox}
          onCloseDialogBox={handleCloseTextDialogBox}
        />
      )}
      <EditAvatar onSubmit={handleSubmit(onSubmitImage)}>
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
              src={user.authorImage.url}
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
              info={user.userName}
              onClickEdit={() => handleOpenTextDialogBox('name')}
            />
            <AccountConfigInfo
              descriptor="Email"
              info={user.login}
              pencil={false}
            />
            <AccountConfigInfo
              descriptor="Descrição"
              info={user?.description}
              onClickEdit={() => handleOpenTextDialogBox('description')}
            />
          </tbody>
        </Infos>
      </Container>
    </>
  );
}
