'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    height: 80vh;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    ${({ theme }) => css`
      color: ${theme.colors.text.secondary};
      text-decoration: none;
      padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
      background-color: ${theme.colors.primary};
      border-radius: ${theme.border.radius};
    `}
  }
`;

export const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weights.bold};
    padding: ${theme.spacings.xsmall} 0 ${theme.spacings.medium} 0;
  `}
`;
