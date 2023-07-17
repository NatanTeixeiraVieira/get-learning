'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginWithCredentials } from 'utils/auth';
import { email, password } from 'utils/validations';
import { z } from 'zod';

import Button from 'components/Button';
import Input from 'components/Input';

import { LoginFormContainer } from './style';

const loginFormSchema = z.object({
  email,
  password,
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ email, password }: LoginFormData) => {
    const callbackUrl = searchParams.get('callbackUrl');
    const response = await loginWithCredentials(email, password);
    if (response?.error) {
      alert(response.error);
      return;
    }

    router.push(callbackUrl ?? '/');
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        helperText={errors.email && errors.email.message}
        {...register('email')}
      />
      <Input
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        isDirty={dirtyFields.password}
        helperText={errors.password && errors.password.message}
        showIcon={showPassword}
        onClickIcon={handleShowPassword}
        {...register('password')}
      />
      <Button text="Entrar" type="submit" />
    </LoginFormContainer>
  );
}
