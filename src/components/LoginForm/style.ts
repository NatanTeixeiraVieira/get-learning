'use client';

import styled, { css } from 'styled-components';

import { ButtonContainer } from 'components/Button/styles';

export const LoginFormContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.small};

    ${theme.media.mobile} {
      ${ButtonContainer} {
        margin: ${theme.spacings.xsmall} 0;
      }
    }
  `}
`;
