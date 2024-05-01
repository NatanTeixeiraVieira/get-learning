'use client';

import styled, { css } from 'styled-components';

const accountIconSize = '2.5rem';

export const Container = styled.div``;

export const AccountIcon = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: calc((4.5rem - ${accountIconSize}) / 2);
    right: ${theme.spacings.medium};
    height: ${accountIconSize};
    width: ${accountIconSize};
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 10;

    a {
      color: ${theme.colors.text.secondary};
      height: 2.5rem;
    }
  `}
`;

export const AccountMenu = styled.div<{ showAccountMenu: boolean }>`
  ${({ theme, showAccountMenu = false }) => css`
    position: absolute;
    display: ${showAccountMenu ? 'block' : 'none'};
    right: ${theme.spacings.medium};
    top: 4rem;
    border-radius: ${theme.border.radius.big};
    padding: ${theme.spacings.xxxsmall};
    background-color: ${theme.colors.background};
    box-shadow: rgba(31, 35, 40, 0.15) 0px 1px 3px,
      rgba(66, 74, 83, 0.15) 0px 8px 24px;
    z-index: 10;

    a {
      width: 100%;
    }

    ${theme.media.mobile} {
      position: fixed;
      display: block;
      border-radius: 0;
      top: 0;
      right: -300px;
      right: ${showAccountMenu && 0};
      bottom: 0;
      width: 300px;
      z-index: 999;
      transition: ${theme.transition.default};
    }

    @media (max-width: 300px) {
      width: 100%;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacings.xxsmall};
    }

    a {
      color: ${theme.colors.text.primary};
      transition: ${theme.transition.fast};

      &:hover {
        text-decoration: none;
      }
    }
  `}
`;

export const XIcon = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.primary};
    width: fit-content;
    margin: ${theme.spacings.xxxsmall} 0;
  `}
`;

export const NavigationItems = styled.li`
  ${({ theme }) => css`
    list-style: none;
    width: 100%;
    padding: ${theme.spacings.xxxsmall};
    transition: ${theme.transition.default};
    border-radius: ${theme.border.radius.default};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.mediumGray};
      opacity: 0.8;
    }

    a {
      display: flex;
      gap: ${theme.spacings.xxxsmall};
    }
  `}
`;

export const ToggleThemeArea = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacings.xxxsmall};
    display: flex;
    justify-content: center;
    gap: ${theme.spacings.xsmall};

    ${theme.media.mobile} {
      justify-content: flex-start;
      padding-left: 0;
      padding-right: 0;
    }

    svg {
      color: ${theme.colors.text.primary};
    }
  `}
`;

export const ThemeIcon = styled.span`
  ${({ theme }) => css`
    display: flex;
    cursor: pointer;
    padding: calc(${theme.spacings.xxxsmall} / 2) ${theme.spacings.xxsmall};
    border-radius: ${theme.border.radius.default};

    &:hover {
      background-color: ${theme.colors.mediumGray};
      opacity: 0.8;
    }
  `}
`;

export const Exit = styled(NavigationItems)`
  ${({ theme }) => css`
    color: ${theme.colors.error};
  `}
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
`;
