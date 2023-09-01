'use client';

import { ReactNode, useEffect } from 'react';

import { Root, RootContent } from './styles';

export type DialogBoxRootProps = {
  children: ReactNode;
  open: boolean;
  width?: string;
};

export default function DialogBoxRoot({
  children,
  open,
  width = '50%',
}: DialogBoxRootProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);
  return (
    <>
      {open && (
        <Root>
          <RootContent width={width}>{children}</RootContent>
        </Root>
      )}
    </>
  );
}
