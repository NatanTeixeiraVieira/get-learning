'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateAuthorInfo } from 'services/author';
import { AccountInfosData } from 'types/accountInfosData';
import { UserLogin } from 'types/login';
import { accountInfosSchema } from 'validations/schemas';

import { DialogBoxButton } from './styles';

import { Button } from 'components/Button';
import { DialogBox } from 'components/DialogBox';
import { Input } from 'components/Input';

type EditAccountInfoProps = {
  user: UserLogin;
  fieldName: 'name' | 'description';
  onCancelButtonClicked: () => void;
  onCloseDialogBox: () => void;
};

export default function EditAccountInfo({
  user,
  fieldName,
  onCancelButtonClicked,
  onCloseDialogBox,
}: EditAccountInfoProps) {
  const fields = {
    name: 'Nome',
    description: 'Descrição',
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountInfosData>({
    resolver: zodResolver(accountInfosSchema),
    defaultValues: {
      name: user.userName,
      description: user.description,
    },
  });

  const onSubmit: SubmitHandler<AccountInfosData> = async ({
    name,
    description,
  }) => {
    if (user.userName === name && user.description === description) return;

    const responseUpdateInfo = await updateAuthorInfo(name, description);
    if (responseUpdateInfo.success) {
      const message =
        fieldName === 'name'
          ? 'Nome de usuário atualizado com sucesso.'
          : 'Descrição atualizada com sucesso.';
      toast.success(message);
      onCloseDialogBox();
      return;
    }
    toast.error(
      `Falha ao atualizar ${
        fieldName === 'name' ? 'o nome' : 'a descrição'
      }. Por favor, tente novamente mais tarde.`
    );
  };

  return (
    <DialogBox.Root open={true}>
      <DialogBox.Title text="" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input.Root>
          <Input.Label>{fields[fieldName]}</Input.Label>
          <Input.Input type="text" autoFocus {...register(fieldName)} />
          {fieldName && errors[fieldName] && (
            <Input.HelperText>{errors[fieldName]?.message}</Input.HelperText>
          )}
        </Input.Root>
        <DialogBox.Actions>
          <DialogBoxButton
            variant="destructive"
            onClick={onCancelButtonClicked}
          >
            Cancelar
          </DialogBoxButton>
          <DialogBoxButton
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting && <Button.IconSpin />}
            {!isSubmitting && 'Salvar'}
          </DialogBoxButton>
        </DialogBox.Actions>
      </form>
    </DialogBox.Root>
  );
}
