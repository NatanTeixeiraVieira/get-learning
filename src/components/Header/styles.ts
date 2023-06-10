'use client';

import styled, { DefaultTheme, css } from 'styled-components';

const gapLinks = (theme: DefaultTheme) =>
  css`
    gap: ${theme.spacings.small};
  `;

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    padding: ${theme.spacings.small} ${theme.spacings.medium};
    color: ${theme.colors.text.secondary};
    background-color: ${theme.colors.primary};
    height: 4.5rem;
  `}
`;

export const HeaderContent = styled.div<{ showMenu: boolean }>`
  ${({ theme, showMenu }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.primary};

    ${theme.media.tablet} {
      position: fixed;
      left: ${showMenu ? 0 : -300}px;
      top: 0;
      bottom: 0;
      padding: ${theme.spacings.huge} ${theme.spacings.small} 0;
      width: 300px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      ${gapLinks(theme)};
      transition: ${theme.transition.default};
    }

    @media (max-width: 300px) {
      width: 100%;
    }

    nav {
      ${theme.media.tablet} {
        margin-top: ${theme.spacings.medium};
      }
    }

    ul {
      display: flex;
      align-items: center;
      ${gapLinks(theme)};

      ${theme.media.tablet} {
        flex-direction: column;
        align-items: flex-start;

        &:nth-child(2) {
          flex-direction: column-reverse;
        }
      }
    }
  `}
`;

export const ThemeIcon = styled.li`
  display: flex;
  cursor: pointer;
`;

export const OutOfMenu = styled.div<{ showMenu: boolean }>`
  ${({ showMenu }) => css`
    display: ${showMenu ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: calc(100vw - 300px);
  `}
`;
