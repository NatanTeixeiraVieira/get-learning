'use client';

import styled, { css } from 'styled-components';

export const LinkContainer = styled.li`
  ${({ theme }) => css`
    list-style: none;

    a {
      color: ${theme.colors.light};
      transition: ${theme.transition.fast};
      display: flex;
      align-items: center;

      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  `}
`;
