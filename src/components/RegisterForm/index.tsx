'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { registerWithCredentials } from 'utils/auth';
import { userName, email, password } from 'utils/validations';
import { z } from 'zod';

import { RegisterFormContainer } from './styles';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

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
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ email, password }: RegisterFormData) => {
    const response = await registerWithCredentials(email, password);

    if (response?.message) {
      alert(response.message);
    }
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Input.Root>
        <Input.Label>Nome de usuário</Input.Label>
        <Input.Input type="text" {...register('userName')} />
        {errors.userName && (
          <Input.HelperText>{errors.userName.message}</Input.HelperText>
        )}
      </Input.Root>
      <Input.Root>
        <Input.Label>Email</Input.Label>
        <Input.Input type="email" {...register('email')} />
        {errors.email && (
          <Input.HelperText>{errors.email.message}</Input.HelperText>
        )}
      </Input.Root>
      <Input.Root>
        <Input.Label>Senha</Input.Label>
        <Input.Input
          type={showPassword ? 'text' : 'password'}
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
