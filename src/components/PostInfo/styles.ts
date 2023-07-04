'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
  `}
`;

export const CategoryElement = styled.span`
  font-style: normal;

  &::after {
    content: ', ';
  }

  &:last-child::after {
    content: '';
  }
`;
