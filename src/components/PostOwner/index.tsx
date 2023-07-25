import Image from 'next/image';
import Link from 'next/link';

import { OwnerInfo, Wrapper, Name } from './styles';

export type PostOwnerProps = {
  avatarSrc: string | undefined;
  name: string;
  description: string | undefined;
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
          src={avatarSrc ?? '/assets/profile.png'}
          alt="Avatar do proprietário do blog"
          width={130}
          height={130}
        />
      </Link>
      <OwnerInfo>
        <Name>
          <Link href={`/${slug}/${authorId}`}>{name}</Link>
        </Name>
        {showDescription && description && <span>{description}</span>}
      </OwnerInfo>
    </Wrapper>
  );
}
