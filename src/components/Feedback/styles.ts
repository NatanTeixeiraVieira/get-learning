'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    margin-top: ${theme.spacings.small};
  `}
`;

const LikeAndDislike = styled.div<{ isAuthenticated: boolean }>`
  ${({ theme, isAuthenticated }) => css`
    display: flex;
    gap: ${theme.spacings.xxxsmall};
    cursor: ${isAuthenticated ? 'pointer' : ''};
    padding: ${theme.spacings.xxxsmall} ${theme.spacings.xsmall};
    border-radius: ${theme.border.radius.big};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      background-color: ${isAuthenticated ? `${theme.colors.light}CC` : ''};
    }
  `}
`;

export const Like = styled(LikeAndDislike)``;

export const Dislike = styled(LikeAndDislike)``;
