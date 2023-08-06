'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ButtonContainer } from './styles';

export type ButtonVariant = 'default' | 'destructive' | 'secondary';

export type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  width?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonRoot({
  children,
  width = '100%',
  variant,
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer width={width} variant={variant} {...props}>
      {children}
    </ButtonContainer>
  );
}
