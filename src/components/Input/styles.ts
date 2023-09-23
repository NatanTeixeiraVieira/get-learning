'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const InputFullContainer = styled.div<{
  hasError?: boolean;
  reverse?: boolean;
}>`
  ${({ theme, hasError, reverse }) => css`
    display: flex;
    flex-direction: ${reverse ? 'row-reverse' : 'row'};
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacings.xsmall};
    margin-top: calc(${theme.spacings.xxxsmall} / 2);
    border: ${theme.border.default};
    border-radius: ${theme.border.radius.big};
    border-color: ${hasError && theme.colors.error};
    width: 100%;
  `}
`;

export const InputField = styled.input`
  ${({ theme }) => css`
    border: none;
    outline: none;
    flex: auto;
    font-size: 1rem;
    background-color: inherit;

    &::placeholder {
      color: ${theme.colors.placeholder};
    }
  `}
`;

export const IconContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 1.2rem;
    cursor: pointer;
    margin-left: ${theme.spacings.xsmall};
  `}
`;

export const HelperText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.error};
    font-size: 0.8rem;
  `}
`;
