'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacings.medium};
    margin: 0 auto ${theme.spacings.huge};
    width: 50vw;

    img {
      border-radius: 100%;
    }
  `}
`;

export const OwnerInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-flow: column wrap;
    gap: ${theme.spacings.xsmall};
  `}
`;

export const Name = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weights.bold};
  `}
`;
