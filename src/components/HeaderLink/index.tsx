import Link from 'next/link';
import { ReactNode } from 'react';

import { LinkContainer } from './styles';

export type HeaderLinkProps = {
  children: ReactNode;
  href: string;
};

export default function HeaderLink({ children, href }: HeaderLinkProps) {
  return (
    <LinkContainer>
      <Link href={href}>{children}</Link>
    </LinkContainer>
  );
}
