'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-style: italic;
  `}
`;

export const AuthorName = styled.span`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.text.primary};
      font-style: normal;
      font-weight: ${theme.font.weights.bold};
    }
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
