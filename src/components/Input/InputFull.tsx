'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { InputFullContainer, InputField } from './styles';

type InputProps = {
  children?: ReactNode;
  hasError?: boolean;
  reverse?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function InputFull(
  { children, hasError, reverse = false, ...props },
  ref
) {
  return (
    <InputFullContainer hasError={hasError} reverse={reverse}>
      <InputField type={props.type} ref={ref} {...props} />
      {children}
    </InputFullContainer>
  );
});
