'use client';

import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  ${({ theme }) => css`
    body {
      font-size: ${theme.font.sizes.xsmall};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${theme.font.weights.xbold};
      color: ${theme.colors.text.primary};
      margin: ${theme.spacings.large} 0;
    }

    p {
      margin: ${theme.spacings.medium} 0;
    }

    ul,
    ol {
      margin: ${theme.spacings.medium};
      padding: ${theme.spacings.medium};
    }
  `}
  `;
export default GlobalStyles;
