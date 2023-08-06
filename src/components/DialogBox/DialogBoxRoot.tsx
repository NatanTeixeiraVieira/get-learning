'use client';

import { ReactNode, useEffect } from 'react';

import { Root, RootContent } from './styles';

export type DialogBoxRootProps = {
  children: ReactNode;
  open: boolean;
};

export default function DialogBoxRoot({ children, open }: DialogBoxRootProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);
  return (
    <Root open={open}>
      <RootContent>{children}</RootContent>
    </Root>
  );
}
