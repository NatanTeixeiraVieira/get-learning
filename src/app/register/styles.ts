'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};
  `}
`;

export const RegisterContent = styled.div`
  width: 35rem;
  margin: 0 auto;
`;
