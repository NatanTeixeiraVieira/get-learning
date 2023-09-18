'use client';

import styled, { css } from 'styled-components';

export const EditAvatar = styled.form``;

export const AvatarImage = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-top: ${theme.spacings.xsmall};
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xlarge};
  `}
`;

export const Avatar = styled.div`
  ${({ theme }) => css`
    text-align: center;

    label {
      width: fit-content;
      cursor: pointer;
      display: flex;
      margin: 0 auto;

      &:hover img {
        opacity: 0.85;
        transition: ${theme.transition.default};
      }
    }

    svg {
      position: relative;
      border-radius: 100%;
      padding: 5px;
      background-color: ${theme.colors.light};
      right: 30px;
      top: 90px;
      z-index: 2;
    }

    input {
      display: none;
    }
  `}
`;

export const Infos = styled.table`
  ${({ theme }) => css`
    width: 100%;
    tbody {
      display: flex;
      flex-direction: column;
      margin: ${theme.spacings.small} 0 ${theme.spacings.medium} 0;

      & > * {
        border-bottom: ${theme.border.default};
        padding: ${theme.spacings.xsmall} 0;
      }

      & > :last-child {
        border-bottom: none;
      }
    }
  `}
`;
