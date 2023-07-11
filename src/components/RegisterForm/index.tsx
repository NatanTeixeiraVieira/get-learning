'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { userName, email, password } from 'utils/validations';
import { z } from 'zod';

import { RegisterFormContainer } from './styles';

import Button from 'components/Button';
import Input from 'components/Input';

const registerFormSchema = z.object({
  userName,
  email,
  password,
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome de usuário"
        type="text"
        {...register('userName')}
        helperText={errors.userName && errors.userName.message}
      />
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
      <Button text="Cadastrar-se" type="submit" />
    </RegisterFormContainer>
  );
}
