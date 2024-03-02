// import useThemeStore from 'store/theme';

// import dark from 'styles/themes/dark';
// import light from 'styles/themes/light';

// export const useToggleTheme = () => {
//   const { theme } = useThemeStore().state;
//   const isDefaultDarkTheme = window.matchMedia(
//     '(prefers-color-scheme: dark)'
//   ).matches;
//   let choosenTheme: typeof light | typeof dark = light;

//   switch (theme) {
//     case 'light':
//       choosenTheme = light;
//       break;
//     case 'dark':
//       choosenTheme = dark;
//       break;
//     case 'system':
//       if (isDefaultDarkTheme) {
//         choosenTheme = dark;
//       }
//       break;
//   }
//   return choosenTheme;
// };
