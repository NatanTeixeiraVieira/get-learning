'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { InputFullContainer, InputField } from './styles';

type InputProps = {
  children?: ReactNode;
  hasError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function InputFull(
  { children, hasError, ...props },
  ref
) {
  return (
    <InputFullContainer hasError={hasError}>
      <InputField type={props.type} ref={ref} {...props} />
      {children}
    </InputFullContainer>
  );
});
