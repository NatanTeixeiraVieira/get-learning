'use client';

import { FormEvent } from 'react';

import { RegisterFormContainer } from './styles';

import Button from 'components/Button';
import Input from 'components/Input';

export default function RegisterForm() {
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ok');
  };

  return (
    <RegisterFormContainer onSubmit={handleRegister}>
      <Input label="Nome de usuário" type="text" />
      <Input label="Email" type="email" />
      <Input label="Senha" type="password" />
      <Button text="Cadastrar-se" />
    </RegisterFormContainer>
  );
}
