'use client';

import styled, { css, DefaultTheme } from 'styled-components';

import { HeadingProps } from '.';

const HeadingSizes = {
  xsmall: (theme: DefaultTheme) => theme.font.sizes.xsmall,
  small: (theme: DefaultTheme) => theme.font.sizes.small,
  medium: (theme: DefaultTheme) => theme.font.sizes.medium,
  large: (theme: DefaultTheme) => theme.font.sizes.large,
};

export const HeadingContainer = styled.h1<HeadingProps>`
  ${({ theme, white, size = 'large', uppercase }) => css`
    color: ${white ? theme.colors.text.secondary : theme.colors.text.primary};
    font-size: ${HeadingSizes[size](theme)};
    text-transform: ${uppercase ? 'uppercase' : 'none'};
  `}
`;
