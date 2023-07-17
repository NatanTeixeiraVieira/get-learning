'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from 'lib/registry';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <StyledComponentsRegistry>
        <ThemeProvider theme={light}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
}
