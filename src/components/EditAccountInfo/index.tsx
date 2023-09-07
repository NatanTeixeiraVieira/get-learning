'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { updateInfo } from 'services/updateAuthor';
import useAccountInfosStore from 'store/accountInfos';
import { AccountInfosDatas } from 'types/accountInfosDatas';
import { Author } from 'types/author';
import { accountInfosSchema } from 'utils/validations';

import { Button } from 'components/Button';
import { DialogBox } from 'components/DialogBox';
import { Input } from 'components/Input';

type EditAccountInfoProps = {
  authorLoggedInfos: Author;
};

export default function EditAccountInfo({
  authorLoggedInfos,
}: EditAccountInfoProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountInfosDatas>({
    resolver: zodResolver(accountInfosSchema),
    defaultValues: {
      name: authorLoggedInfos.name,
      description: authorLoggedInfos.description,
    },
  });

  const {
    state: { editIsOpen, dialogBoxDescriptor },
    actions: { closeDialogBox },
  } = useAccountInfosStore();

  const router = useRouter();
  const descriptorWithFallback = dialogBoxDescriptor ?? 'name';

  const handleCloseDialogBox = () => {
    reset();
    closeDialogBox();
  };

  const onSubmit: SubmitHandler<AccountInfosDatas> = async (datas) => {
    if (
      datas.name !== authorLoggedInfos.name ||
      datas.description !== authorLoggedInfos.description
    ) {
      const responseUpdateInfo = await updateInfo(
        authorLoggedInfos.authorId,
        datas
      );
      if (responseUpdateInfo.ok) {
        closeDialogBox();
        const message =
          datas.name !== authorLoggedInfos.name
            ? 'Nome de usuário atualizado com sucesso.'
            : 'Descrição atualizada com sucesso.';
        router.refresh();
        toast.success(message);
        return;
      }

      toast.error(
        datas.name !== authorLoggedInfos.name
          ? 'Falha ao atualizar o nome de usuário. Por favor, tente novamente mais tarde.'
          : 'Falha ao atualizar a descrição. Por favor, tente novamente mais tarde.'
      );
    }
  };

  const text = dialogBoxDescriptor === 'name' ? 'Nome de usuário' : 'Descrição';

  return (
    <DialogBox.Root open={editIsOpen}>
      <DialogBox.Title text={`Editar ${text.toLocaleLowerCase()}`} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input.Root>
          <Input.Label htmlFor={descriptorWithFallback}>{text}</Input.Label>
          <Input.Input
            id={descriptorWithFallback}
            defaultValue={
              dialogBoxDescriptor ? authorLoggedInfos[dialogBoxDescriptor] : ''
            }
            type="text"
            autoFocus
            {...register(descriptorWithFallback)}
          />
          {dialogBoxDescriptor && errors[`${dialogBoxDescriptor}`] && (
            <Input.HelperText>
              {errors[`${dialogBoxDescriptor}`]?.message}
            </Input.HelperText>
          )}
        </Input.Root>
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
      </form>
    </DialogBox.Root>
  );
}
