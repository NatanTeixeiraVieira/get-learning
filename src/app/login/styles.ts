'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.medium};
  `}
`;

export const LoginContent = styled.div`
  width: 35rem;
  margin: 0 auto;
`;

export const UtilsPages = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.small};
  `}
`;
