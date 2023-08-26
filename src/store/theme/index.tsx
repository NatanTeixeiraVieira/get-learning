import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

type ThemeStoreProps = {
  state: {
    theme: Theme;
  };
  actions: {
    toggleTheme: (theme: Theme) => void;
  };
};

const useThemeStore = create<ThemeStoreProps>((set) => {
  const theme = localStorage.getItem('GetLearning_theme');
  return {
    state: {
      theme: (theme ?? 'system') as Theme,
    },
    actions: {
      toggleTheme: (theme) => {
        set((state) => ({
          state: { ...state.state, theme },
        }));
        localStorage.setItem('GetLearning_theme', theme);
      },
    },
  };
});

export default useThemeStore;
