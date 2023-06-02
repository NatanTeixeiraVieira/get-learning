import { ReactNode } from 'react';

import { HeadingContainer } from './styles';

export type HeadingProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  white?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  uppercase?: boolean;
};

export default function Heading({
  children,
  as = 'h1',
  white = false,
  size = 'large',
  uppercase = false,
}: HeadingProps) {
  return (
    <HeadingContainer as={as} white={white} size={size} uppercase={uppercase}>
      {children}
    </HeadingContainer>
  );
}
