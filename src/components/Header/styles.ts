'use client';

import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacings.small} ${theme.spacings.medium};
    background-color: ${theme.colors.primary};
    height: 4.5rem;

    ${theme.media.mobile} {
      padding: ${theme.spacings.small} ${theme.spacings.xsmall};
    }
  `}
`;

export const LoginAndRegister = styled.ul`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.small};
  `}
`;

export const OutOfMenu = styled.div<{ showMenu: boolean }>`
  ${({ showMenu }) => css`
    display: ${showMenu ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: calc(100vw - 300px);
    z-index: 100;
    background: transparent;
  `}
`;
