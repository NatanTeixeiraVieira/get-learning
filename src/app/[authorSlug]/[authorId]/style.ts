'use client';

import styled, { css } from 'styled-components';

import { Wrapper as WrapperPostGrid } from 'components/PostGrid/styles';

export const Wrapper = styled.article`
  ${({ theme }) => css`
    padding-top: ${theme.spacings.huge};

    ${WrapperPostGrid} {
      padding-top: 0;
    }
  `}
`;

export const NoPostFound = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacings.xsmall};

    a {
      color: ${theme.colors.text.secondary};
      margin-top: ${theme.spacings.xsmall};

      &:hover {
        text-decoration: none;
      }
    }
  `}
`;
