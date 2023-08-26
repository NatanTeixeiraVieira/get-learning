'use client';

import styled, { css, keyframes } from 'styled-components';

const animation = keyframes`
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 135% 0%;
  }
`;

const Background = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      -90deg,
      ${theme.colors.skeleton.default} 0%,
      ${theme.colors.skeleton.animation} 50%,
      ${theme.colors.skeleton.default} 100%
    );
    background-size: 400% 400%;
    animation: ${animation} ${theme.skeleton.animation};
  `}
`;

export const LoadingContainer = styled.div``;

export const PostsList = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 20rem);
    gap: ${theme.spacings.medium};
    padding: ${theme.spacings.huge} ${theme.spacings.small} 0;
    justify-content: center;
  `}
`;

export const Post = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
    cursor: progress;
  `}
`;

export const Image = styled(Background)`
  width: 100%;
  border-radius: 12px;
  height: 11.25rem;
`;

export const PostText = styled(Background)<{ height: number }>`
  ${({ theme, height }) => css`
    width: 100%;
    border-radius: ${theme.border.radius};
    height: ${height}rem;
  `}
`;
