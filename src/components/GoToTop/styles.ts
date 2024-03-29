'use client';

import styled, { css } from 'styled-components';

export const ContainerLink = styled.a`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: ${theme.spacings.medium};
    bottom: ${theme.spacings.medium};
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
    background-color: ${theme.colors.text.primary};
    opacity: 0.9;
    transition: all ease 0.3s;
    z-index: 1000;

    &:hover {
      opacity: 1;
    }
    * {
      color: ${theme.colors.text.secondary};
    }
    svg {
      width: ${theme.font.sizes.small};
    }
  `}
`;
