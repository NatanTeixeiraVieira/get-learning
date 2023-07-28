import { Metadata } from 'next';

import { Container, Content } from './styles';

import Heading from 'components/Heading';
import MakePostForm from 'components/MakePostForm';

export const metadata: Metadata = {
  title: 'Publicar novo post',
};

export default function MakePost() {
  return (
    <Container>
      <Content>
        <Heading>Publicar novo post</Heading>
        <MakePostForm />
      </Content>
    </Container>
  );
}
