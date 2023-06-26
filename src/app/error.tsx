'use client';

import styled, { css } from 'styled-components';

import { HeadingContainer } from 'components/Heading/styles';

import Heading from 'components/Heading';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <ErrorContainer>
      <Heading as="h2" size="medium">
        Ocorreu um erro
      </Heading>
      <p>Desculpe, houve um erro ao carregar as informações.</p>
      <p>Erro: {error.message}</p>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  ${({ theme }) => css`
    text-align: center;
    height: 64vh;
    margin-top: ${theme.spacings.medium};

    ${HeadingContainer} {
      margin-bottom: ${theme.spacings.xsmall};
    }
  `}
`;
