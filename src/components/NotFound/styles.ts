'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 65vh;
`;

export const Animation404Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacings.xsmall};

    img {
      background-color: ${theme.colors.primary};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${theme.spacings.huge};
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weights.bold};
    margin: ${theme.spacings.medium};
  `}
`;

export const Navigation = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.xsmall};
    width: 100%;
    justify-content: center;

    a {
      color: ${theme.colors.light};
      background-color: ${theme.title === 'dark'
        ? theme.colors.darkGray
        : theme.colors.primary};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${theme.spacings.xsmall};
      border-radius: ${theme.border.radius.big};
      width: 50%;
      height: 3rem;
      text-align: center;

      &:hover {
        text-decoration: none;
      }
    }
  `}
`;
