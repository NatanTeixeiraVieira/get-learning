import { Metadata } from 'next';

import { Container, RegisterContent } from './styles';

import Heading from 'components/Heading';
import RegisterForm from 'components/RegisterForm';

export const metadata: Metadata = {
  title: 'Cadastrar-se',
};

export default function Register() {
  return (
    <Container>
      <RegisterContent>
        <Heading>Cadastre-se</Heading>
        <RegisterForm />
      </RegisterContent>
    </Container>
  );
}
