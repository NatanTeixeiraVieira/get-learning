'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import loginWithCredentials from 'services/loginWithCredentials';
import registerWithCredentials from 'services/registerWithCredentials';
import { RegisterDatas } from 'types/register';
import translateText from 'utils/translateText';
import { registerFormSchema } from 'utils/validations';

import { RegisterFormContainer } from './styles';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<RegisterDatas>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ userName, email, password }: RegisterDatas) => {
    const response = await registerWithCredentials(userName, email, password);

    if (response.status === 201) {
      const loginResponse = await loginWithCredentials(email, password);
      if (loginResponse?.ok) {
        router.push('/');
        return;
      }
      toast.warning(
        'Cadastro concluído, mas houve falha ao logar. Por favor tente logar mais tarde.'
      );
    }

    const translatedResponse = await translateText(response.datas.message);
    toast.error(translatedResponse);
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input.Root>
        <Input.Label htmlFor="userName">Nome de usuário</Input.Label>
        <Input.Input
          id="userName"
          type="text"
          disabled={isSubmitting}
          {...register('userName')}
        />
        {errors.userName && (
          <Input.HelperText>{errors.userName.message}</Input.HelperText>
        )}
      </Input.Root>
      <Input.Root>
        <Input.Label htmlFor="email">Email</Input.Label>
        <Input.Input
          id="email"
          type="email"
          disabled={isSubmitting}
          {...register('email')}
        />
        {errors.email && (
          <Input.HelperText>{errors.email.message}</Input.HelperText>
        )}
      </Input.Root>
      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>
        <Input.Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          disabled={isSubmitting}
          {...register('password')}
        >
          {dirtyFields.password &&
            (showPassword ? (
              <Input.Icon
                icon={EyeOff}
                onClick={handleShowPassword}
                title="Esconder senha"
              />
            ) : (
              <Input.Icon icon={Eye} onClick={handleShowPassword} />
            ))}
        </Input.Input>

        {errors.password && (
          <Input.HelperText>{errors.password.message}</Input.HelperText>
        )}
      </Input.Root>

      <Button.Root type="submit" disabled={isSubmitting}>
        {isSubmitting && <Button.IconSpin />}
        {!isSubmitting && 'Cadastrar'}
      </Button.Root>
    </RegisterFormContainer>
  );
}
