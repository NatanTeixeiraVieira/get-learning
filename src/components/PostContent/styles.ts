'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    max-width: 60vw;
    margin: 0 auto;

    pre {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text.secondary};
      padding: ${theme.spacings.xsmall};
      margin: ${theme.spacings.medium} 0;
      overflow-x: auto;
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
      overflow-x: hidden;
      overflow-x: auto;
      border-collapse: collapse;
    }

    table td,
    table th {
      padding: ${theme.spacings.small};
      border: ${theme.border.default};
    }
  `}
`;
