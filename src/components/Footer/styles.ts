'use client';

import styled, { css } from 'styled-components';

export const FooterContainer = styled.footer`
  ${({ theme }) => css`
    text-align: center;
    border-top: 1px solid ${theme.colors.mediumGray};
    padding: ${theme.spacings.medium} ${theme.spacings.huge};
  `}
`;
