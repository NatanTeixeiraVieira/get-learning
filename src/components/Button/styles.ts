'use client';

import styled, { DefaultTheme, css, keyframes } from 'styled-components';

import { ButtonProps } from './ButtonRoot';

const animationSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const backgroundColors = {
  default: (theme: DefaultTheme) =>
    theme.title === 'light' ? theme.colors.primary : theme.colors.darkGray,
  secondary: (theme: DefaultTheme) =>
    theme.title === 'light' ? theme.colors.darkGray : theme.colors.primary,
  destructive: (theme: DefaultTheme) => theme.colors.destructive,
};

export const ButtonContainer = styled.button<ButtonProps>`
  ${({ theme, width, disabled, variant = 'default' }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacings.xxxsmall} ${theme.spacings.xsmall};
    background-color: ${backgroundColors[variant](theme)};
    opacity: ${disabled ? '0.8' : '1'};
    color: ${theme.colors.light};
    font-size: 1rem;
    width: ${width};
    height: 3rem;
    border: none;
    border-radius: ${theme.border.radius.big};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `}
`;

const IconSize = '1.5rem';

export const IconSpin = styled.div`
  display: flex;
  svg {
    width: ${IconSize};
    height: ${IconSize};
    animation: ${animationSpin} 1.5s linear infinite;
  }
`;
