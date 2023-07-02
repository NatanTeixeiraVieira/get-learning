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
