'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import { feedback } from 'constants/localStorageKeys';
import { useToggleTheme } from 'hooks/useToggleTheme';
import StyledComponentsRegistry from 'lib/registry';
import { saveFeedback } from 'services/saveFeedback';
import { InfosToSaveFeedback } from 'types/feedback';

import GlobalStyles from 'styles/global';
import baseTheme from 'styles/themes/base';

import 'react-toastify/dist/ReactToastify.min.css';

export function Providers({ children }: { children: ReactNode }) {
  const isSavingFeedback = useRef(false);
  useEffect(() => {
    const handleFeedback = async () => {
      const feedbackInJson = localStorage.getItem(feedback);
      const feedbackSavedInLocalStorage: InfosToSaveFeedback | undefined =
        feedbackInJson && JSON.parse(feedbackInJson);

      if (
        feedbackSavedInLocalStorage?.increment ||
        feedbackSavedInLocalStorage?.decrement
      ) {
        isSavingFeedback.current = true;
        await saveFeedback(feedbackSavedInLocalStorage);
        isSavingFeedback.current = false;
      }
    };
    const interval = setInterval(() => {
      if (!isSavingFeedback.current) {
        handleFeedback();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
