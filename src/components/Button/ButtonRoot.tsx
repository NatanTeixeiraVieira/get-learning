'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ButtonContainer } from './styles';

type ButtonProps = {
  children: ReactNode;
  width?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonRoot({
  children,
  width = '100%',
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer width={width} {...props}>
      {children}
    </ButtonContainer>
  );
}
