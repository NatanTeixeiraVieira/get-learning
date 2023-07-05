import Image from 'next/image';
import Link from 'next/link';

import { OwnerInfo, Wrapper, Name } from './styles';

export type PostOwnerProps = {
  avatarSrc: string;
  name: string;
  description: string;
  showDescription?: boolean;
  slug: string;
  authorId: string;
};

export default function PostOwner({
  avatarSrc,
  name,
  description,
  showDescription = true,
  slug,
  authorId,
}: PostOwnerProps) {
  return (
    <Wrapper>
      <Link href={`/${slug}/${authorId}`}>
        <Image
          src={avatarSrc}
          alt="Avatar do proprietário do blog"
          width={130}
          height={130}
        />
      </Link>
      <OwnerInfo>
        <Name>
          <Link href={`/${slug}/${authorId}`}>{name}</Link>
        </Name>
        {showDescription && <span>{description}</span>}
      </OwnerInfo>
    </Wrapper>
  );
}
