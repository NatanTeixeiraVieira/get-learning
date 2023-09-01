'use client';

import styled, { css } from 'styled-components';

export const EditAvatar = styled.form``;

export const AvatarImage = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-top: ${theme.spacings.xsmall};
    img {
      border-radius: 100%;
    }
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
      cursor: pointer;

      &:hover > img {
        opacity: 0.8;
      }
    }

    svg {
      position: absolute;
      border-radius: 100%;
      padding: 5px;
      background-color: ${theme.colors.light};
      margin-left: -2rem;
      margin-top: 90px;
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
