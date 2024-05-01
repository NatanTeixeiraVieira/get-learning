import { Theme } from 'types/theme';
import { create } from 'zustand';

import light from 'styles/themes/light';

type ThemeStoreProps = {
  state: {
    theme: Theme;
  };
  actions: {
    setTheme: (theme: Theme) => void;
  };
};

export const useThemeStore = create<ThemeStoreProps>((set) => ({
  state: {
    theme: light,
  },
  actions: {
    setTheme: (theme) =>
      set({
        state: {
          theme: theme,
        },
      }),
  },
}));
