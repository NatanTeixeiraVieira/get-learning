'use client';

import styled, { DefaultTheme, css } from 'styled-components';

const gapLinks = (theme: DefaultTheme) =>
  css`
    gap: ${theme.spacings.small};
  `;

const zIndex = 100;

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacings.small} ${theme.spacings.medium};
    color: ${theme.colors.text.secondary};
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
    ${gapLinks(theme)};
  `}
`;

export const HeaderContent = styled.div<{ showMenu: boolean }>`
  ${({ theme, showMenu }) => css`
    display: flex;
    background-color: ${theme.colors.primary};
    position: fixed;
    left: ${showMenu ? 0 : -300}px;
    top: 0;
    bottom: 0;
    padding: ${theme.spacings.huge} ${theme.spacings.small} 0;
    width: 300px;
    ${gapLinks(theme)};
    transition: ${theme.transition.default};
    z-index: ${zIndex};

    @media (max-width: 300px) {
      width: 100%;
    }

    nav {
      margin-top: ${theme.spacings.medium};
    }

    ul {
      display: flex;
      align-items: center;
      ${gapLinks(theme)};

      flex-direction: column;
      align-items: flex-start;

      &:nth-child(2) {
        flex-direction: column-reverse;
      }
    }
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
    z-index: ${zIndex};
  `}
`;
