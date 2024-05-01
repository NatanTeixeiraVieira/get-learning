import { useCallback } from 'react';

import { themeNameKey } from 'constants/cookiesKeys';
import { parseCookies, setCookie } from 'nookies';
import { useThemeStore } from 'store/theme';
import { Theme, ThemeNames } from 'types/theme';

import dark from 'styles/themes/dark';
import light from 'styles/themes/light';

export const useToggleTheme = () => {
  const {
    state: { theme },
    actions: { setTheme },
  } = useThemeStore();

  const startTheme = useCallback(() => {
    const themeName = parseCookies()[themeNameKey] as ThemeNames | null;

    if (themeName === 'light') {
      setTheme(light);
      return;
    }
    if (themeName === 'dark') {
      setTheme(dark);
      return;
    }

    const isDefaultDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (isDefaultDarkTheme) {
      setTheme(dark);
      return;
    }

    setTheme(light);
  }, [setTheme]);

  const toggleTheme = useCallback(
    (theme: Theme | null) => {
      if (!theme) {
        setCookie(null, themeNameKey, 'system');
        const isDefaultDarkTheme = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;

        if (isDefaultDarkTheme) {
          setTheme(dark);
          return;
        }

        setTheme(light);
        return;
      }

      setTheme(theme);
      setCookie(null, themeNameKey, theme.title);
    },
    [setTheme]
  );

  return {
    theme,
    startTheme,
    toggleTheme,
  };
};
