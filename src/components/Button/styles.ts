'use client';

import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button<{ width: string }>`
  ${({ theme, width }) => css`
    padding: ${theme.spacings.xsmall};
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.secondary};
    font-size: 1rem;
    width: ${width};
    border: none;
    border-radius: ${theme.border.radius};
    cursor: pointer;
  `}
`;
