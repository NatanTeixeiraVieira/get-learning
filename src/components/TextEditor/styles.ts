import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    .jodit-toolbar__box,
    .jodit-status-bar {
      background-color: ${theme.title === 'dark' &&
      theme.colors.primary} !important;
    }
    .jodit-wysiwyg {
      background-color: ${theme.colors.background} !important;
    }
  `}
`;
