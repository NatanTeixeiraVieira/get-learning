'use client';

import Image, { ImageProps } from 'next/image';

import { Container } from './styles';

type AvatarProfileProps = {
  src?: string | undefined;
} & Omit<ImageProps, 'src'>;

export default function AvatarProfile({ src, ...props }: AvatarProfileProps) {
  // const currentTheme = useToggleTheme();

  return (
    <Container>
      <Image {...props} src={src ?? `/assets/profile-light.png`} />
    </Container>
  );
}
