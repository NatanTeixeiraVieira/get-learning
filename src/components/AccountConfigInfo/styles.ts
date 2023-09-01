'use client';

import styled, { css } from 'styled-components';

export const Container = styled.tr`
  display: flex;
  align-items: center;
`;

export const Descriptor = styled.td`
  width: 25%;
`;

export const Info = styled.td`
  ${({ theme }) => css`
    flex: 1;
    font-size: ${theme.font.sizes.small};
    margin: 0 ${theme.spacings.medium};
  `}
`;

export const PencilIcon = styled.td`
  display: flex;
  cursor: pointer;
`;
