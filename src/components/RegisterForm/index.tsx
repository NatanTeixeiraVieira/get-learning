'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { validateEmail } from 'utils/validations';
import { z } from 'zod';

import { RegisterFormContainer } from './styles';

import Button from 'components/Button';
import Input from 'components/Input';

const registerFormSchema = z.object({
  userName: z
    .string()
    .nonempty('Esse campo é obrigatório.')
    .min(3, 'Seu nome de usuário deve conter pelo menos 3 caracteres.')
    .trim(),

  email: z
    .string()
    .nonempty('Esse campo é obrigatório.')
    .email('Email inválido.')
    .regex(validateEmail, 'Email inválido.'),

  password: z
    .string()
    .nonempty('Esse campo é obrigatório.')
    .min(6, 'A senha deve ter entre 6 e 60 caracteres.')
    .max(60, 'A senha deve ter entre 6 e 60 caracteres.'),
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
