import { ReactNode } from 'react';

type InputLabelProps = {
  children: ReactNode;
  id?: string;
};

export default function InputLabel({ children, id }: InputLabelProps) {
  return <label htmlFor={id}>{children}</label>;
}
