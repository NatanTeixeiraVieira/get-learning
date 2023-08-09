'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from 'lib/registry';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';
import 'react-toastify/dist/ReactToastify.min.css';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <StyledComponentsRegistry>
        <ThemeProvider theme={light}>
          <GlobalStyles />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={3}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable={false}
            theme="light"
          />
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
}
