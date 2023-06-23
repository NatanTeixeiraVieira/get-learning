'use client';

import styled, { css } from 'styled-components';

export const EndOfPosts = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-top: ${theme.spacings.medium};
  `}
`;
