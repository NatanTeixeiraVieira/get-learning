'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  img {
    width: 100%;
    height: 50%;
  }

  ${({ theme }) => css`
    hr {
      color: ${theme.colors.mediumGray};
      margin-top: ${theme.spacings.large};
    }
  `}
`;
