'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto ${theme.spacings.huge};
    gap: ${theme.spacings.small};

    ${theme.media.mobile} {
      flex-direction: column;
      gap: ${theme.spacings.xsmall};
    }

    img {
      border-radius: 100%;

      ${theme.media.mobile} {
        width: 90px;
        height: 90px;
      }
    }
  `}
`;

export const OwnerInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};

    ${theme.media.mobile} {
      text-align: center;
    }
  `}
`;

export const Name = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.weights.bold};
  `}
`;
