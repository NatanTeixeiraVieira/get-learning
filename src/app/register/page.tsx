import { Container, RegisterContent } from './styles';

import Heading from 'components/Heading';
import RegisterForm from 'components/RegisterForm';

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
