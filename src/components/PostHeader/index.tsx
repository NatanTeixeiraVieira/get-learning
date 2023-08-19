import Image from 'next/image';

import { Category } from 'types/post';

import { Wrapper } from './styles';

import Heading from 'components/Heading';
import PostInfo from 'components/PostInfo';

export type PostHeaderProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  createdAt: number;
  category: Category;
};

export default function PostHeader({
  title,
  subtitle,
  imageSrc,
  createdAt,
  category,
}: PostHeaderProps) {
  return (
    <Wrapper>
      <Heading>{title}</Heading>
      <p>{subtitle}</p>
      <Image
        src={imageSrc}
        alt="Imagem de ilustração do post"
        width={1500}
        height={750}
      />
      <PostInfo createdAt={createdAt} category={category} />
      <hr />
    </Wrapper>
  );
}
