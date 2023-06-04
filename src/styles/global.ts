'use client';

import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      line-height: ${theme.spacings.small};
    }

    html {
      scroll-behavior: smooth;
    }

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
      margin: ${theme.spacings.xsmall} 0;
    }

    a {
      color: ${theme.colors.links};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `}
  `;

export default GlobalStyles;
