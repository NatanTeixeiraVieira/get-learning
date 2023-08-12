'use client';

import styled, { css } from 'styled-components';

import { MenuBurgerProps } from '.';

const menuLinesAnimation = () => css`
  span {
    &:nth-child(1) {
      transform-origin: 0% 0%;
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform-origin: 0% 100%;
      transform: rotate(-45deg);
    }
  }
`;

export const Container = styled.div<Pick<MenuBurgerProps, 'showMenu'>>`
  ${({ theme, showMenu }) => css`
    z-index: 999;
    width: 24px;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 4px;
      margin-bottom: 4px;
      background-color: ${theme.colors.text.secondary};
      border-radius: 3px;
      transition: ${theme.transition.default};

      &:nth-child(3) {
        margin-bottom: 0;
      }
    }

    ${showMenu && menuLinesAnimation()}
  `}
`;
