import Link from 'next/link';

import {
  Animation404Container,
  Container,
  Content,
  Description,
  Navigation,
} from './styles';

import ButtonBackToPreviousPage from 'components/ButtonBackToPreviousPage';

import Animation404 from '../../../public/assets/Animation404';

export default function NotFound() {
  return (
    <Container>
      <Content>
        <Animation404Container>
          <Animation404 />
        </Animation404Container>
        <Description>Página não encontrada</Description>
        <Navigation>
          <ButtonBackToPreviousPage />
          <Link href="/">Página inicial</Link>
        </Navigation>
      </Content>
    </Container>
  );
}
