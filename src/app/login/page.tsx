import { Metadata } from 'next';
import Link from 'next/link';

import { Container, LoginContent, UtilsPages } from './styles';

import Heading from 'components/Heading';
import LoginForm from 'components/LoginForm';

export const metadata: Metadata = {
  title: 'Entrar',
};

export default function Login() {
  return (
    <Container>
      <LoginContent>
        <Heading>Entrar</Heading>
        <LoginForm />
        <UtilsPages>
          <p>
            É novo por aqui? <Link href="/register">Crie sua conta.</Link>
          </p>
          <p>
            Esqueceu sua senha? <Link href="/">Clique aqui.</Link>
          </p>
        </UtilsPages>
      </LoginContent>
    </Container>
  );
}
