'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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
  const descriptorWithFallback = dialogBoxDescriptor ?? 'name';

  const handleCloseDialogBox = () => {
    reset();
    closeDialogBox();
  };

  const onSubmit: SubmitHandler<AccountInfosDatas> = (data) => {
    console.log(data);
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
