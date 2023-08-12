'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};

    ${theme.media.mobile} {
      padding: ${theme.spacings.xsmall};
    }
  `}
`;

export const Content = styled.div`
  max-width: 60rem;
  margin: 0 auto;
`;
