'use client';

import { ButtonHTMLAttributes } from 'react';

import { ButtonContainer } from './styles';

type ButtonProps = {
  text: string;
  width?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  width = '100%',
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer width={width} {...props}>
      {text}
    </ButtonContainer>
  );
}
