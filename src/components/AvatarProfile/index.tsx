'use client';

import Image, { ImageProps } from 'next/image';

import { useToggleTheme } from 'hooks/useToggleTheme';

type AvatarProfileProps = {
  src: string | undefined;
} & Omit<ImageProps, 'src'>;

export default function AvatarProfile({ src, ...props }: AvatarProfileProps) {
  const currentTheme = useToggleTheme();

  return (
    <Image
      {...props}
      src={src ?? `/assets/profile-${currentTheme.title}.png`}
    />
  );
}
