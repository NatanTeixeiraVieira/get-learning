'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { emailIdKey } from 'constants/cookiesKeys';
import { emailConfirmationExpiresTimeInSeconds } from 'constants/times';
import { Eye, EyeOff } from 'lucide-react';
import { setCookie } from 'nookies';
import { registerSendEmailVerification } from 'services/auth';
import { RegisterData } from 'types/registerFormData';
import { registerFormSchema } from 'validations/schemas';

import { RegisterFormContainer } from './styles';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ userName, email, password }: RegisterData) => {
    const {
      success,
      data: { emailId },
    } = await registerSendEmailVerification(email, password, userName);
    if (success) {
      setCookie(null, emailIdKey, emailId, {
        maxAge: emailConfirmationExpiresTimeInSeconds,
        path: '/',
      });
      toast.success(`Um email de verificação foi enviado para você`);
      return;
    }
    toast.error('Falha ao realizar cadastro.');
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
