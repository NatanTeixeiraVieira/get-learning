'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: grid;
    max-width: 100rem;
    grid-template-columns: repeat(auto-fill, 20rem);
    gap: ${theme.spacings.medium};
    padding: ${theme.spacings.huge} ${theme.spacings.small} 0;
    justify-content: center;
    margin: 0 auto;
  `}
`;
