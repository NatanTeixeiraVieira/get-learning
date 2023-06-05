import Image from 'next/image';

import { OwnerInfo, Wrapper, Name } from './styles';

export type PostOwnerProps = {
  avatarSrc: string;
  name: string;
  description: string;
  showDescription?: boolean;
};

export default function PostOwner({
  avatarSrc,
  name,
  description,
  showDescription = true,
}: PostOwnerProps) {
  return (
    <Wrapper>
      <Image
        src={avatarSrc}
        alt="Avatar do proprietário do blog"
        width={150}
        height={150}
      />
      <OwnerInfo>
        <Name>{name}</Name>
        {showDescription && <span>{description}</span>}
      </OwnerInfo>
    </Wrapper>
  );
}
