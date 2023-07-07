import Link from 'next/link';

import { Container, Content, Description } from './styles';

import Heading from 'components/Heading';

export default function NotFound() {
  return (
    <Container>
      <Content>
        <Heading>Erro 404</Heading>
        <Description>Página não encontrada</Description>
        <Link href="/">Página inicial</Link>
      </Content>
    </Container>
  );
}
