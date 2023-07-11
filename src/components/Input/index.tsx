import { InputHTMLAttributes, forwardRef, useId } from 'react';

import { Eye } from 'lucide-react';

import { Container, FullInput, HelperText, Icon, InputField } from './styles';

type InputProps = {
  label?: string;
  helperText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type, helperText, ...props },
  ref
) {
  const id = useId();
  const hasError = !!helperText;

  return (
    <Container>
      {label && <label htmlFor={id}>{label}</label>}
      <FullInput hasError={hasError}>
        <InputField type={type} id={id} ref={ref} {...props} />
        {type === 'password' && (
          <Icon>
            <Eye />
          </Icon>
        )}
      </FullInput>
      {hasError && <HelperText>{helperText}</HelperText>}
    </Container>
  );
});
