'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { EyeOff, Eye } from 'lucide-react';
import loginWithCredentials from 'services/loginWithCredentials';
import { LoginDatas } from 'types/login';
import { loginFormSchema } from 'utils/validations';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { LoginFormContainer } from './style';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<LoginDatas>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ email, password }: LoginDatas) => {
    const callbackUrl = searchParams.get('callbackUrl');
    const response = await loginWithCredentials(email, password);
    if (response?.error) {
      toast.error(response.error);
      return;
    }

    router.push(callbackUrl ?? '/');
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
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
        {!isSubmitting && 'Entrar'}
      </Button.Root>
    </LoginFormContainer>
  );
}
