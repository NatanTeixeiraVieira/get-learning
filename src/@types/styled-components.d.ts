import dark from 'styles/themes/dark';
import light from 'styles/themes/light';
import theme from 'styles/themes/base';

type Theme = typeof theme;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    title: typeof light.title | typeof dark.title;
    colors: typeof light.colors | typeof dark.colors;
  }
}
