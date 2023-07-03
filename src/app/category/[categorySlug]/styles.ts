'use client';

import styled, { css } from 'styled-components';

import { HeadingContainer } from 'components/Heading/styles';

export const Container = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.spacings.xlarge};
    & > ${HeadingContainer} {
      text-align: center;

      a {
        color: ${theme.colors.text.primary};
        text-decoration: none;
      }
    }
  `}
`;
