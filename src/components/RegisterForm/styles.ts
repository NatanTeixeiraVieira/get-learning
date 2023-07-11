'use client';

import styled, { css } from 'styled-components';

export const RegisterFormContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.small};
  `}
`;
