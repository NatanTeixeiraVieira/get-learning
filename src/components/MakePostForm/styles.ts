'use client';

import styled, { css } from 'styled-components';

import { ButtonContainer } from 'components/Button/styles';

export const MakePostFormContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.medium};
    margin-top: ${theme.spacings.small};
  `}
`;

export const Excerpt = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    textarea {
      padding: ${theme.spacings.xsmall};
      font-size: 1rem;
      border-radius: ${theme.border.radius.big};
      margin-top: calc(${theme.spacings.xxxsmall} / 2);
    }
  `}
`;

export const Classification = styled.div`
  ${({ theme }) => css`
    width: 50%;

    ${theme.media.mobile} {
      width: 100%;
    }
  `}
`;

export const ClassificationFields = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacings.xxxsmall};
  `}
`;

export const Select = styled.select`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxxsmall};
    border-radius: ${theme.border.radius.default};
  `}
`;

export const IconPlus = styled.div`
  display: flex;
  cursor: pointer;
`;

export const Display = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    margin-top: ${theme.spacings.xxxsmall};
    gap: ${theme.spacings.xsmall};

    span {
      height: 40px;
    }

    svg {
      margin-bottom: 10px;
      margin-left: -12px;
      cursor: pointer;

      background-color: ${theme.colors.mediumGray};
      border-radius: ${theme.border.radius.big};
    }
  `}
`;

export const TagText = styled.span`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxxsmall};
    padding-right: ${theme.spacings.xxsmall};
    background-color: ${theme.colors.mediumGray};
    border-radius: ${theme.border.radius.big};
  `}
`;

export const AllowComents = styled.div`
  ${({ theme }) => css`
    input {
      margin-right: ${theme.spacings.xxxsmall};
    }
  `}
`;

export const CoverImage = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxxsmall};

    input {
      display: none;
    }

    p {
      margin-top: -${theme.spacings.xxxsmall};
    }
  `}
`;

export const PreviewImage = styled.label`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    height: 11.25rem;
    margin-top: ${theme.spacings.xxxsmall};
    background-color: ${theme.title === 'dark'
      ? theme.colors.darkGray
      : theme.colors.mediumGray};
    border-radius: 12px;
    cursor: pointer;

    img {
      border-radius: 12px;
    }
  `}
`;

export const Buttons = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    display: flex;
    gap: ${theme.spacings.small};
    margin-top: ${theme.spacings.medium};

    ${theme.media.mobile} {
      width: 100%;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.destructive};
      border-radius: ${theme.border.radius.big};
      color: ${theme.colors.light};
      width: 10rem;
      height: 3rem;
      padding: ${theme.spacings.xxxsmall};

      &:hover {
        text-decoration: none;
      }

      ${theme.media.mobile} {
        width: 100%;
      }
    }

    ${ButtonContainer} {
      ${theme.media.mobile} {
        width: 100%;
      }
    }
  `}
`;
