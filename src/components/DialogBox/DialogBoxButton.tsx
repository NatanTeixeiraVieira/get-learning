import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ButtonDialogBoxContainer } from './styles';

import { Button } from 'components/Button';
import { ButtonVariant } from 'components/Button/ButtonRoot';

type DialogBoxButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function DialogBoxButton({
  children,
  variant,
  ...props
}: DialogBoxButtonProps) {
  return (
    <ButtonDialogBoxContainer>
      <Button.Root variant={variant} {...props}>
        {children}
      </Button.Root>
    </ButtonDialogBoxContainer>
  );
}
