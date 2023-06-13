import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import { subtitleFormatter } from 'utils/subtitleFormatter';

import { Container, Subtitle } from './styles';

import Heading from 'components/Heading';

export type PostCardProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  slug: string;
} & HTMLAttributes<HTMLDivElement>;

export default function PostCard({
  title,
  subtitle,
  imageSrc,
  slug,
  ...rest
}: PostCardProps) {
  return (
    <Container {...rest}>
      <Link href={`/post/${slug}`}>
        <Image src={imageSrc} alt={title} width={320} height={180} />
      </Link>
      <Heading as="h2" size="small">
        <Link href={`/post/${slug}`}>{title}</Link>
      </Heading>
      <Subtitle>{subtitleFormatter(subtitle)}</Subtitle>
    </Container>
  );
}
