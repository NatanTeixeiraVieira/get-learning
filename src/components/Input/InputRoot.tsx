'use client';

import { ReactNode } from 'react';

import { Container } from './styles';

type InputRootProps = {
  children: ReactNode;
};

export default function InputRoot({ children }: InputRootProps) {
  return <Container>{children}</Container>;
}
