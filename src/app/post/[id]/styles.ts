'use client';

import styled, { DefaultTheme, css } from 'styled-components';

const padding = (theme: DefaultTheme) => theme.spacings.small;

export const Wrapper = styled.article`
  ${({ theme }) => css`
    padding: ${theme.spacings.huge} ${padding(theme)} 0;
    width: calc(60vw + ${padding(theme)});
    margin: 0 auto;

    p {
      margin: ${theme.spacings.xsmall} 0;
    }

    ${theme.media.tablet} {
      width: 100vw;
    }
  `}
`;

export const Tags = styled.section`
  a {
    &::after {
      content: ', ';
    }

    &:last-child::after {
      content: '';
    }
  }
`;
