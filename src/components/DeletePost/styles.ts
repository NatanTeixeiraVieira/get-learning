'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    width: fit-content;
    position: relative;
    display: flex;
    left: 17.3rem;
    top: 2.2rem;
    z-index: 5;
    cursor: pointer;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.secondary};
    padding: calc(${theme.spacings.xxsmall} / 2) ${theme.spacings.xxxsmall};
    border-radius: ${theme.border.radius.default};
  `}
`;
