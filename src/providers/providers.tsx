'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import { useToggleTheme } from 'hooks/useToggleTheme';
import StyledComponentsRegistry from 'lib/registry';

import GlobalStyles from 'styles/global';
import baseTheme from 'styles/themes/base';

import 'react-toastify/dist/ReactToastify.min.css';

export function Providers({ children }: { children: ReactNode }) {
  const theme = useToggleTheme();
  return (
    <SessionProvider>
      <StyledComponentsRegistry>
        <ThemeProvider theme={{ ...baseTheme, ...theme }}>
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
            theme={theme.title}
            toastStyle={{
              backgroundColor:
                theme.title === 'dark' ? theme.colors.darkGray : '',
            }}
          />
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
}
