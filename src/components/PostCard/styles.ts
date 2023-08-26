'use client';

import styled, { css } from 'styled-components';

import { HeadingContainer } from 'components/Heading/styles';

export const Container = styled.div`
  ${({ theme }) => css`
    ${HeadingContainer} {
      a {
        color: ${theme.colors.text.primary};
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

export const Options = styled.div`
  ${({ theme }) => css`
    width: fit-content;
    display: flex;
    gap: calc(${theme.spacings.xxxsmall} / 2);
    position: relative;
    left: 15.25rem;
    top: 2.5rem;

    a {
      z-index: 5;
    }
  `}
`;

export const Option = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    background-color: ${theme.colors.primary};
    padding: calc(${theme.spacings.xxsmall} / 2) ${theme.spacings.xxxsmall};
    border-radius: ${theme.border.radius.default};
    z-index: 10;

    svg * {
      color: ${theme.colors.light};
    }
  `}
`;

export const UpdatePost = styled(Option)``;

export const PostImage = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.text.primary};
      transition: ${theme.transition.default};
    }
    img {
      border-radius: 12px;
      width: 100%;
      height: 11.25rem;
      &:hover {
        opacity: 0.9;
      }
    }
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    line-height: 1.3rem;
    color: ${theme.colors.text.primary};
  `}
`;
