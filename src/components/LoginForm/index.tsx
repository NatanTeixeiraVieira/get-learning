'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        {...register('email')}
        helperText={errors.email && errors.email.message}
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
