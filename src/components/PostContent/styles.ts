'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.huge};
    overflow-x: auto;

    * {
      background-color: ${theme.colors.background} !important;
      color: ${theme.colors.text.primary} !important;
    }

    p {
      font-family: 'Open Sans', sans-serif;
    }

    pre {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text.secondary};
      padding: ${theme.spacings.xsmall};
      margin: ${theme.spacings.medium} 0;
      overflow-x: auto;
    }

    blockquote {
      margin-left: ${theme.spacings.medium};
      padding-left: ${theme.spacings.xsmall};
      border-left: ${theme.border.large};
      font-style: italic;
      opacity: 0.8;
    }

    img {
      max-width: 100%;
    }

    ul,
    ol {
      margin: ${theme.spacings.xsmall} 0 ${theme.spacings.medium}
        ${theme.spacings.medium};
    }

    hr {
      color: ${theme.colors.mediumGray};
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    table td,
    table th {
      padding: ${theme.spacings.small};
      border: ${theme.border.default};
      overflow-x: auto;
    }
  `}
`;
