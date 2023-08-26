'use client';

import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;

      ${theme.media.mobile} {
        font-size: 14px;
      }

      ${theme.media.mobilexsmall} {
        font-size: 12px;
      }
    }

    body {
      background-color: ${theme.colors.background};

      * {
        color: ${theme.colors.text.primary};
        line-height: 1.5rem;
      }
    }

    input,
    textarea,
    select {
      background-color: ${theme.colors.background};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${theme.font.weights.xbold};
      color: ${theme.colors.text.primary};
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
