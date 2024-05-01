'use client';

import { ReactNode, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from 'lib/registry';

import GlobalStyles from 'styles/global';
import baseTheme from 'styles/themes/base';

import 'react-toastify/dist/ReactToastify.min.css';
import { useToggleTheme } from 'hooks/useToggleTheme';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const { theme, startTheme } = useToggleTheme();

  useEffect(() => {
    startTheme();
  }, [startTheme]);

  return (
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
  );
}
