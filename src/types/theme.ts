import dark from 'styles/themes/dark';
import light from 'styles/themes/light';

export type ThemeNames = 'light' | 'dark' | 'system';

export type Theme = typeof light | typeof dark;
