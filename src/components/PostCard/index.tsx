import Image from 'next/image';
import Link from 'next/link';

import { textFormatter } from 'utils/textFormatter';

import { Container, Subtitle } from './styles';

import Heading from 'components/Heading';

export type PostCardProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  id: string;
  key: string;
};

export default function PostCard({
  title,
  subtitle,
  imageSrc,
  id,
  key,
}: PostCardProps) {
  return (
    <Container key={key}>
      <Link href={`/post/${id}`}>
        <Image src={imageSrc} alt={title} width={320} height={180} />
      </Link>
      <Heading as="h2" size="small">
        <Link href={`/post/${id}`}>{title}</Link>
      </Heading>
      <Subtitle>{textFormatter(subtitle)}</Subtitle>
    </Container>
  );
}
