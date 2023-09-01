'use client';

import styled, { css, keyframes } from 'styled-components';

import { ButtonContainer } from 'components/Button/styles';

import { DialogBoxRootProps } from './DialogBoxRoot';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Root = styled.div`
  ${({ theme }) => css`
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    padding: ${theme.spacings.xsmall};
    z-index: 999;
    display: flex;
    animation: ${fadeIn} 0.2s ease;
  `}
`;

export const RootContent = styled.div<Pick<DialogBoxRootProps, 'width'>>`
  ${({ theme, width }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xsmall};
    width: ${width};
    background-color: ${theme.title === 'dark'
      ? theme.colors.darkGray
      : theme.colors.background};
    padding: ${theme.spacings.small};
    border-radius: ${theme.border.radius.big};
    z-index: 999;

    ${theme.media.mobile} {
      width: 100%;
    }
  `}
`;

export const Message = styled.div``;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacings.small};
    width: 100%;
    margin-top: ${theme.spacings.xsmall};
  `}
`;

export const ButtonDialogBoxContainer = styled.div`
  ${({ theme }) => css`
    ${ButtonContainer} {
      padding: ${theme.spacings.xxxsmall} ${theme.spacings.xsmall};
    }
  `}
`;
