'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};
  `}
`;

export const Content = styled.div`
  width: 60rem;
  margin: 0 auto;
`;
