'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const FullInput = styled.div<{ hasError: boolean }>`
  ${({ theme, hasError }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1px;
    margin-top: calc(${theme.spacings.xxxsmall} / 2);
    border: ${theme.border.default};
    border-radius: ${theme.border.radius};
    border-color: ${hasError && theme.colors.error};
    width: 100%;
  `}
`;

export const InputField = styled.input`
  ${({ theme }) => css`
    border: none;
    outline: none;
    flex: auto;
    padding: ${theme.spacings.xsmall};
    font-size: 1rem;

    &::placeholder {
      color: ${theme.colors.placeholder};
    }
  `}
`;

export const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 1.2rem;
    cursor: pointer;
    margin-right: ${theme.spacings.xsmall};
  `}
`;

export const HelperText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.error};
    font-size: 0.8rem;
  `}
`;
