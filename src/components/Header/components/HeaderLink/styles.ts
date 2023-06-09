'use client';

import styled, { css } from 'styled-components';

export const LinkContainer = styled.li`
  ${({ theme }) => css`
    list-style: none;

    a {
      color: ${theme.colors.text.secondary};
      transition: ${theme.transition.fast};

      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  `}
`;
