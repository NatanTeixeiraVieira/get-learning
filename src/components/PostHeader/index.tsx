import Image from 'next/image';

import { Wrapper } from './styles';

import Heading from 'components/Heading';
import PostInfo from 'components/PostInfo';
import { PostInfoProps } from 'components/PostInfo';

export type PostHeaderProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  postInfo: PostInfoProps;
};

export default function PostHeader({
  title,
  subtitle,
  imageSrc,
  postInfo,
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
      <PostInfo {...postInfo} />
      <hr />
    </Wrapper>
  );
}
