'use client';

import styled, { css } from 'styled-components';

import { HeadingContainer } from 'components/Heading/styles';

export const Container = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.text.primary};
      transition: ${theme.transition.default};

      img {
        border-radius: 12px;
        width: 100%;
        height: 11.25rem;
      }

      &:hover {
        opacity: 0.9;
      }
    }

    ${HeadingContainer} {
      a {
        text-decoration: none;
      }
      margin: ${theme.spacings.xxxsmall} 0 ${theme.spacings.xxsmall} 0;
      transition: ${theme.transition.default};

      &:hover {
        opacity: 0.8;
      }
    }
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    line-height: 1.3rem;
  `}
`;
