import { Metadata } from 'next';

import { Container, Content } from './styles';

import Heading from 'components/Heading';
import MakePostForm from 'components/MakePostForm';

export const metadata: Metadata = {
  title: 'Publicar novo post',
};

type CreateAndUpdatePostProps = {
  title: string;
};

export default function CreateAndUpdatePost({
  title,
}: CreateAndUpdatePostProps) {
  return (
    <Container>
      <Content>
        <Heading>{title}</Heading>
        <MakePostForm />
      </Content>
    </Container>
  );
}
