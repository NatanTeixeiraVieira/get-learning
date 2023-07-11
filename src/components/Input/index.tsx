'use client';

import { InputHTMLAttributes, forwardRef, useId } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Container, FullInput, HelperText, Icon, InputField } from './styles';

type InputProps = {
  label?: string;
  helperText?: string;
  isDirty?: boolean;
  showIcon?: boolean;
  onClickIcon?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    type,
    helperText,
    isDirty = false,
    showIcon = false,
    onClickIcon,
    ...props
  },
  ref
) {
  const id = useId();
  const hasError = !!helperText;

  return (
    <Container>
      {label && <label htmlFor={id}>{label}</label>}
      <FullInput hasError={hasError}>
        <InputField type={type} id={props.id ?? id} ref={ref} {...props} />
        {props.name === 'password' && isDirty && (
          <Icon
            onClick={onClickIcon}
            title={showIcon ? 'Esconder senha' : 'Mostrar senha'}
          >
            {showIcon && <EyeOff />}
            {!showIcon && <Eye />}
          </Icon>
        )}
      </FullInput>
      {hasError && <HelperText>{helperText}</HelperText>}
    </Container>
  );
});
