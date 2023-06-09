import Link from 'next/link';

import { LinkContainer } from './styles';

export type HeaderLinkProps = {
  name: string;
  href: string;
};

export default function HeaderLink({ name, href }: HeaderLinkProps) {
  return (
    <LinkContainer>
      <Link href={href}>{name}</Link>
    </LinkContainer>
  );
}
