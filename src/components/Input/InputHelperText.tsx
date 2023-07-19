import { ReactNode } from 'react';

import { HelperText } from './styles';

type InputHelperTextProps = {
  children: ReactNode;
};

export default function InputHelperText({ children }: InputHelperTextProps) {
  return <HelperText>{children}</HelperText>;
}
