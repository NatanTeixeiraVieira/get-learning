import Image from 'next/image';
import Link from 'next/link';

import { Pencil } from 'lucide-react';
import { CoverImage } from 'types/post';
import { textFormatter } from 'utils/textFormatter';

import { Container, PostImage, Options, Subtitle, UpdatePost } from './styles';

import DeletePost from 'components/DeletePost';
import Heading from 'components/Heading';

export type PostCardProps = {
  title: string;
  subtitle: string;
  coverImage: CoverImage;
  id: string;
  isPostOwner: boolean;
};

export default function PostCard({
  title,
  subtitle,
  coverImage,
  id,
  isPostOwner,
}: PostCardProps) {
  return (
    <Container>
      {isPostOwner && (
        <Options>
          <UpdatePost>
            <Link
              href={{
                pathname: '/edit',
                query: {
                  update: id,
                },
              }}
            >
              <Pencil size="1rem" />
            </Link>
          </UpdatePost>
          <DeletePost postId={id} coverImageName={coverImage.name} />
        </Options>
      )}
      <PostImage>
        <Link href={`/post/${id}`}>
          <Image src={coverImage.url} alt={title} width={320} height={180} />
        </Link>
      </PostImage>
      <Heading as="h2" size="small">
        <Link href={`/post/${id}`}>{title}</Link>
      </Heading>
      <Subtitle>{textFormatter(subtitle)}</Subtitle>
    </Container>
  );
}
