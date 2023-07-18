'use client';

import styled, { css, keyframes } from 'styled-components';

const animationSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ButtonContainer = styled.button<{ width: string }>`
  ${({ theme, width, disabled }) => css`
    padding: ${theme.spacings.xsmall};
    background-color: ${theme.colors.primary};
    opacity: ${disabled ? '0.8' : '1'};
    color: ${theme.colors.text.secondary};
    font-size: 1rem;
    width: ${width};
    height: 3rem;
    border: none;
    border-radius: ${theme.border.radius};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `}
`;

const IconSize = '1.5rem';

export const IconSpin = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;

  svg {
    width: ${IconSize};
    height: ${IconSize};
    animation: ${animationSpin} 1.5s linear infinite;
  }
`;
